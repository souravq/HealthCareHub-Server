import express, { NextFunction, Request, Response } from "express";
import auth from "../../middlewares/auth";
import { imageUpload } from "../../helpers/imageUpload";
import { UserRole } from "@prisma/client";
import { SpecialtiesController } from "./specialties.controller";
const router = express.Router();

// Create Specialties
router.post(
  "/",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN),
  imageUpload.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    return SpecialtiesController.createSpecialties(req, res, next);
  }
);

export const SpecialtiesRoute = router;
