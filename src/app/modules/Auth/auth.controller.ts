import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { boolean } from "zod";

const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let result = await AuthService.loginUser(req.body);

    const { refreshToken } = result;
    res.cookie("refreshToken", refreshToken, {
      secure: false,
      httpOnly: true,
    });

    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Login Succesfully",
      data: {
        accessToken: result.accessToken,
        needPasswordChange: result.needPasswordChange,
      },
    });
  }
);

// Refresh Token
const refreshToken = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let { refreshToken } = req.cookies;

    let result = await AuthService.refreshToken(refreshToken);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Refresh Token",
      data: result,
    });
  }
);

// Change Password
const changePassword = catchAsync(
  async (req: Request & { user?: any }, res: Response, next: NextFunction) => {
    let result = await AuthService.changePassword(req.user, req.body);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Password Change Done",
      data: result,
    });
  }
);

// Forgot Password
const forgotPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AuthService.forgotPassword(req.body);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Forgot Password",
      data: result,
    });
  }
);

// Reset Password
const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await AuthService.resetPassword();
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Reset Password",
      data: result,
    });
  }
);

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
  forgotPassword,
  resetPassword,
};
