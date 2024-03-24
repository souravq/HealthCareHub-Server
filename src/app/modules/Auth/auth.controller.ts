import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { AuthService } from "./auth.service";
import { sendResponse } from "../../../shared/sendResponse";

const loginUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    let result = await AuthService.loginUser(req.body);
    console.log(result);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Login Succesfully",
      data: result,
    });
  }
);
// [1,2,2,1]
// true

export const AuthController = {
  loginUser,
};
