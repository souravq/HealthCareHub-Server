import { Request, Response } from "express";
import { userService } from "./user.service";
import { imageUpload } from "../../helpers/imageUpload";

const createAdmin = async (req: Request, res: Response) => {
  try {
    //console.log("File", req.file);
    // console.log("Data", req.body.data);

    const file = req.file;
    if (file) {
      const imageUploadToCloudinary = await imageUpload.imageUploadToCloudinary(
        file
      );
      console.log({ imageUploadToCloudinary });
      req.body.data.admin.profilePhoto = imageUploadToCloudinary?.secure_url;

      console.log(req.body.data);
    }

    const result = await userService.createAdmin(req.body);
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

export const userController = {
  createAdmin,
};
