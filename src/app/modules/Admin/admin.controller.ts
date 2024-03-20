import { NextFunction, Request, Response } from "express";
import { AdminService } from "./admin.service";
import { sendResponse } from "../../../shared/sendResponse";
import { StatusCodes } from "http-status-codes";

const getAllAdminDataFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await AdminService.getAllAdminDataFromDB(req.query);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "All Admin data fetched !!!",
      meta: result.meta,
      data: result.data,
    });
  } catch (err: any) {
    next(err);
  }
};

// Get Admin Data By Id
const getAdminDataByIdFromDB = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const result = await AdminService.getAdminDataByIdFromDB(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "All Admin data fetched !!!",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

// Update Admin Data By Id
const updateAdminDataById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id;
    const bodyData = req.body;
    const result = await AdminService.updateAdminDataById(id, bodyData);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Admin data Updated !!!",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

// Delete Admin Data
const deleteAdminDataById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await AdminService.deleteAdminDataById(req.params.id);

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Admin deleted Successfully !!!",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

// Soft Delete Admin Data
const softDeleteAdminDataById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await AdminService.softDeleteAdminDataById(req.params.id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      success: true,
      message: "Admin Data Soft deleted Successfully !!!",
      data: result,
    });
  } catch (err: any) {
    next(err);
  }
};

export const AdminController = {
  getAllAdminDataFromDB,
  getAdminDataByIdFromDB,
  updateAdminDataById,
  deleteAdminDataById,
  softDeleteAdminDataById,
};
