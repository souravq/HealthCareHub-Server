import { PrismaClient, UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import { jwtHelper } from "../../helpers/jwtHelper";
import * as jwt from "jsonwebtoken";
import config from "../../../config";

const prisma = new PrismaClient();

const loginUser = async (payload: { email: string; password: string }) => {
  // Check User
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  // Check Password
  const validPassword = await bcrypt.compare(
    payload.password,
    userData.password
  );
  if (!validPassword) {
    throw new Error("Password not correct");
  }

  // Generate Access Token
  const accessToken = jwtHelper.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.jwt_secret as string,
    config.jwt_expries_in as string
  );

  // Generate Refresh Token
  const refreshToken = jwtHelper.generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    config.refresh_jwt_secret as string,
    config.refresh_jwt_secret_expries_in as string
  );

  //console.log({ accessToken });
  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

// Refresh Token
const refreshToken = async (refreshToken: string) => {
  try {
    let decoded = jwtHelper.verifyToken(
      refreshToken,
      config.refresh_jwt_secret as string
    );
    console.log({ decoded });

    // Check User Exist
    const userData = await prisma.user.findUniqueOrThrow({
      where: {
        email: decoded.email,
        status: UserStatus.ACTIVE,
      },
    });
    console.log(userData);

    // Generate Access Token
    const accessToken = jwtHelper.generateToken(
      {
        email: userData.email,
        role: userData.role,
      },
      config.jwt_secret as string,
      config.jwt_expries_in as string
    );

    return {
      accessToken,
      needPasswordChange: userData.needPasswordChange,
    };
  } catch (err: any) {
    throw new Error("User Not Found");
  }
};

export const AuthService = {
  loginUser,
  refreshToken,
};
