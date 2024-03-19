import { Request, Response } from "express";
import { AdminService } from "./admin.service";

const getAllAdminDataFromDB = async (req: Request, res: Response) => {
  console.log(req.query);
  try {
    const result = await AdminService.getAllAdminDataFromDB(req.query);
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
