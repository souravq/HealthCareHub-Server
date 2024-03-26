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

    console.log(result);
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

export const AuthController = {
  loginUser,
  refreshToken,
};
