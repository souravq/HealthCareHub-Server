import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";
import { catchAsync } from "../../../shared/catchAsync";
import { sendResponse } from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";
import { IAuthUser } from "../../interface";

// Create Admin
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

// Create Doctor
const createDoctor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    const result = await userService.createDoctor(req);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Doctor Created Successfully!!!",
      data: result,
    });
  }
);

// Create Patient
const createPatient = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    const result = await userService.createPatient(req);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Patient Created Successfully!!!",
      data: result,
    });
  }
);

// Get My Profile
const getMyProfile = catchAsync(
  async (
    req: Request & { user?: IAuthUser },
    res: Response,
    next: NextFunction
  ) => {
    const result = await userService.getMyProfile(req.user as IAuthUser);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "My Profile Data Fetched!!!",
      data: result,
    });
  }
);

// Update My Profile
const updateMyProfile = catchAsync(
  async (
    req: Request & { user?: IAuthUser },
    res: Response,
    next: NextFunction
  ) => {
    //req.body = JSON.parse(req.body.data);
    const user = req.user;
    const file = req.file;
    const result = await userService.updateMyProfile(
      user as IAuthUser,
      file,
      req.body
    );
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Profile Updated Successfully!!!",
      data: result,
    });
  }
);

export const userController = {
  createAdmin,
  createDoctor,
  createPatient,
  getMyProfile,
  updateMyProfile,
};
