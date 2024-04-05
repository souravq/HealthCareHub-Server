import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import { imageUpload } from "../../helpers/imageUpload";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { boolean } from "zod";

const createAdmin = async (req: Request, res: Response) => {
  try {
    const result = await userService.createAdmin(req);
    res.status(200).json({
      success: true,
      message: "Admin Created Successfully !!!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.name || "Something went wrong !!!",
      error: error,
    });
  }
};

// Get My Profile
// const getMyProfile = async (req: Request, res: Response) => {
//   try {
//     const result = await userService.createAdmin(req);
//     res.status(200).json({
//       success: true,
//       message: "My Profile Data Fetched !!!",
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: error.name || "Something went wrong !!!",
//       error: error,
//     });
//   }
// };

const getMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await userService.getMyProfile(req.user);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "My Profile Data Fetched!!!",
      data: result,
    });
  }
);

export const userController = {
  createAdmin,
  getMyProfile,
};
