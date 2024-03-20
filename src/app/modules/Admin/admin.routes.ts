import express from "express";
import { AdminController } from "./admin.controller";
const router = express.Router();

router.get("/", AdminController.getAllAdminDataFromDB);

router.get("/:id", AdminController.getAdminDataByIdFromDB);

export const AdminRouter = router;
