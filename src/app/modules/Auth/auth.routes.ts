import express from "express";
import { AuthController } from "./auth.controller";
const router = express.Router();

router.post("/", AuthController.loginUser);

// Refresh Token
router.post("/refresh-token", AuthController.refreshToken);

export const AuthRouter = router;
