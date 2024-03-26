import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
  const accessToken = jwt.sign(
    {
      email: userData.email,
      role: userData.role,
    },
    "123456",
    {
      algorithm: "HS256",
      expiresIn: "5m",
    }
  );

  // Generate Refresh Token
  const refreshToken = jwt.sign(
    {
      email: userData.email,
      role: userData.role,
    },
    "12345678",
    {
      algorithm: "HS256",
      expiresIn: "30d",
    }
  );

  //console.log({ accessToken });
  return {
    accessToken,
    refreshToken,
    needPasswordChange: userData.needPasswordChange,
  };
};

export const AuthService = {
  loginUser,
};
