import express from "express";
import { AuthController } from "./auth.controller";
import auth from "../../middlewares/auth";
import { UserRole } from "@prisma/client";
const router = express.Router();

// Login User
router.post("/", AuthController.loginUser);

// Refresh Token
router.post("/refresh-token", AuthController.refreshToken);

// Change Password
router.post(
  "/change-password",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  AuthController.changePassword
);

// Forgot Password
router.post("/forgot-password", AuthController.forgotPassword);

// Reset Password
router.get("/reset-password", AuthController.resetPassword);

export const AuthRouter = router;
