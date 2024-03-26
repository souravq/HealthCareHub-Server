import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
const router = express.Router();

router.post(
  "/",
  auth("SUPER_ADMIN", "ADMIN", "DOCTOR"),
  userController.createAdmin
);

export const userRouter = router;
