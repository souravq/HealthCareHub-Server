import { PrismaClient, UserStatus } from "@prisma/client";
import bcrypt from "bcrypt";
import { jwtHelper } from "../../helpers/jwtHelper";
import * as jwt from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../errors/ApiError";
import { StatusCodes } from "http-status-codes";
import sendMail from "./emailService";

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

  //
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

    // Check User Exist
    const userData = await prisma.user.findUniqueOrThrow({
      where: {
        email: decoded.email,
        status: UserStatus.ACTIVE,
      },
    });

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
  //
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });

  const checkPassword = await bcrypt.compare(
    payload.oldPassword,
    userData.password
  );

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

// Forgot Password
const forgotPassword = async (payload: { email: string }) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      email: payload.email,
      status: UserStatus.ACTIVE,
    },
  });

  const resetPasswordToken = jwtHelper.generateToken(
    { email: userData.email, role: userData.role },
    "12345",
    "10m"
  );

  const resetPasswordLink = `http://localhost:4000/api/v1/auth/reset-password?userId=${userData.id}&token=${resetPasswordToken}`;

  const html = `
  <div>
    <p>The reset link <a href=${resetPasswordLink}>Click Here</a></p>
  </div>
  `;

  await sendMail(userData.email, html);

  return resetPasswordLink;
};

// Reset Password
const resetPassword = async (token: string, payload: any) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: payload.id,
      status: UserStatus.ACTIVE,
    },
  });
  const isValidToken = jwtHelper.verifyToken(token, "12345");
  console.log({ isValidToken });
  if (!isValidToken) {
    throw new ApiError(StatusCodes.FORBIDDEN, "Forbidden");
  }

  const hashPassword = await bcrypt.hash(payload.password, 12);

  await prisma.user.update({
    where: {
      id: payload.id,
    },
    data: {
      password: hashPassword,
    },
  });

  return {
    message: "Password Reset Successfully",
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};
