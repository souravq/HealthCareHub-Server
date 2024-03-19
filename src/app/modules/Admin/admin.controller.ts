import { Request, Response } from "express";
import { AdminService } from "./admin.service";

const getAllAdminDataFromDB = async (req: Request, res: Response) => {
  try {
    const result = await AdminService.getAllAdminDataFromDB();
    res.status(200).json({
      success: true,
      message: "All Admin data fetched !!!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.name,
      data: err,
    });
  }
};

export const AdminController = {
  getAllAdminDataFromDB,
};
