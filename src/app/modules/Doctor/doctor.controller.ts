import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { DoctorService } from "./doctor.service";
import { sendResponse } from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const updateDoctor = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const doctorId = req.params.id;
    const result = await DoctorService.updateDoctor(doctorId, req.body);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Doctor Data Updated Successfully",
      data: result,
    });
  }
);

export const DoctorController = {
  updateDoctor,
};
