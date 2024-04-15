import { SpecialtiesZodValidation } from "./specialties.validation";
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
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body =
        await SpecialtiesZodValidation.createSpecialtiesValidation.parseAsync(
          JSON.parse(req.body.data)
        );
      next();
    } catch (err) {
      next(err);
    }
    //return SpecialtiesController.createSpecialties(req, res, next);
  },
  SpecialtiesController.createSpecialties
);

export const SpecialtiesRoute = router;
