import express from "express";
import { AdminController } from "./admin.controller";
const router = express.Router();

// Get All Admin Data
router.get("/", AdminController.getAllAdminDataFromDB);

// Get Admin Data By Id
router.get("/:id", AdminController.getAdminDataByIdFromDB);

// Update Data
router.patch("/:id", AdminController.updateAdminDataById);

// Delete Admin Data
router.delete("/:id", AdminController.deleteAdminDataById);

export const AdminRouter = router;
