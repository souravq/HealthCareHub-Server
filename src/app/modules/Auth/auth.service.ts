import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import generateToken from "../../helpers/jwtHelper";
import * as jwt from "jsonwebtoken";

const prisma = new PrismaClient();

const loginUser = async (payload: { email: string; password: string }) => {
  // Check User
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
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
  const accessToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "12345",
    "5m"
  );

  // Generate Refresh Token
  const refreshToken = generateToken(
    {
      email: userData.email,
      role: userData.role,
    },
    "12345678",
    "30d"
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
    let decoded = jwt.verify(refreshToken, "12345678");
    console.log(decoded);

    // Check User Exist
    const userData = await prisma.user.findUniqueOrThrow({
      where: {
        email: decoded.email,
      },
    });
    console.log(userData);

    // Generate Access Token
    const accessToken = generateToken(
      {
        email: userData.email,
        role: userData.role,
      },
      "12345",
      "5m"
    );

    return {
      accessToken,
      needPasswordChange: userData.needPasswordChange,
    };
  } catch (err: any) {
    throw new Error(err);
  }
};

export const AuthService = {
  loginUser,
  refreshToken,
};
