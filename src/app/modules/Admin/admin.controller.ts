import { Request, Response } from "express";
import { AdminService } from "./admin.service";

const getAllAdminDataFromDB = async (req: Request, res: Response) => {
  //console.log(req.query);
  try {
    const result = await AdminService.getAllAdminDataFromDB(req.query);
    res.status(200).json({
      success: true,
      message: "All Admin data fetched !!!",
      meta: result.meta,
      data: result.data,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err?.name,
      data: err,
    });
  }
};

// Get Admin Data By Id

const getAdminDataByIdFromDB = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    console.log(id);
    const result = await AdminService.getAdminDataByIdFromDB(id);
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
  getAdminDataByIdFromDB,
};
