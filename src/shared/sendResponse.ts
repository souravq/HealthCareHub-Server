import { Response } from "express";

export function sendResponse<T>(
  res: Response,
  responseData: {
    statusCode: number;
    success: boolean;
    message: string;
    meta?: {
      page: number;
      limit: number;
    };
    data: T | null | undefined;
  }
) {
  res.status(responseData.statusCode).json({
    success: responseData.success,
    message: responseData.message,
    meta: responseData.meta,
    data: responseData.data,
  });
}
