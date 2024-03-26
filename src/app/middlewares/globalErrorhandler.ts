import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //console.log("Reach");
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: err.message || err.name || "Something Went Wrong",
    data: err,
  });
};
