import express, { NextFunction, Request, Response } from "express";
import { AdminController } from "./admin.controller";
const router = express.Router();

import { AnyZodObject, z } from "zod";

const updateZod = z.object({
  body: z.object({
    name: z.string(),
    contactNumber: z.string(),
  }),
});

// Validate Request
const validateRequest = (zodSchema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await zodSchema.parseAsync({
        body: req.body,
      });
      next();
    } catch (err: any) {
      next(err);
    }
  };
};

// Get All Admin Data
router.get("/", AdminController.getAllAdminDataFromDB);

// Get Admin Data By Id
router.get("/:id", AdminController.getAdminDataByIdFromDB);

// Update Data
router.patch(
  "/:id",
  validateRequest(updateZod),
  AdminController.updateAdminDataById
);

// Delete Admin Data
router.delete("/:id", AdminController.deleteAdminDataById);

// Soft Delete Admin Data
router.patch("/soft/:id", AdminController.softDeleteAdminDataById);

export const AdminRouter = router;
