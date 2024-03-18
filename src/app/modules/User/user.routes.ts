import express, { Request, Response } from "express";
import { userController } from "./user.controller";
const router = express.Router();

router.get("/", userController.getUser);

export const userRouter = router;
