import { PrismaClient, UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import { jwtHelper } from "../../helpers/jwtHelper";
import * as jwt from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../errors/ApiError";
import { StatusCodes } from "http-status-codes";

const prisma = new PrismaClient();

// User Login

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

// Change Password
const changePassword = async (user: any, payload: any) => {
  //console.log(user, payload);
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });
  console.log({ userData });

  const checkPassword = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );
  console.log({ checkPassword });

  if (!checkPassword) {
    throw new ApiError(StatusCodes.FORBIDDEN, "Password Incorrect !!!");
  }

  const hashPassword = await bcrypt.hash(payload.newPassword, 12);

  await prisma.user.update({
    where: {
      email: user.email,
    },
    data: {
      password: hashPassword,
      needPasswordChange: false,
    },
  });

  return {
    message: "Password Changed Successfully !!!",
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
};
