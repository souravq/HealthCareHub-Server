import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { imageUpload } from "../../helpers/imageUpload";
import { userValidation } from "./user.validation";
import { UserRole } from "@prisma/client";
const router = express.Router();

// Get My Profile
router.get(
  "/myprofile",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  userController.getMyProfile
);

// Create Admin
router.post(
  "/create-admin",
  auth("SUPER_ADMIN", "ADMIN"),
  imageUpload.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createAdminValidation.parse(
      JSON.parse(req.body.data)
    );
    return userController.createAdmin(req, res);
  }
);

// Create Doctor
router.post(
  "/create-doctor",
  auth("SUPER_ADMIN", "ADMIN"),
  imageUpload.upload.single("file"),
  userController.createDoctor
  // (req: Request, res: Response, next: NextFunction) => {
  //   console.log("Enter");
  //   req.body = userValidation.createDoctorValidation.parse(
  //     JSON.parse(req.body.data)
  //   );
  //   console.log("data", req.body);
  //   return userController.createDoctor(req, res, next);
  // }
);

// Create Patient
router.post(
  "/create-patient",
  imageUpload.upload.single("file"),
  userController.createPatient
);

export const userRouter = router;
