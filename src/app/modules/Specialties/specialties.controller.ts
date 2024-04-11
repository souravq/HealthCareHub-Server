// Create Specialties

import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../../../shared/catchAsync";
import { SpecialtiesService } from "./specialties.service";
import { sendResponse } from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const createSpecialties = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await SpecialtiesService.createSpecialties(req);
    sendResponse(res, {
      statusCode: StatusCodes.CREATED,
      success: true,
      message: "Specialties Created Successfully",
      data: result,
    });
  }
);

export const SpecialtiesController = {
  createSpecialties,
};
