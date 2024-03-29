import express from "express";
import { userRouter } from "../modules/User/user.routes";
import { AdminRouter } from "../modules/Admin/admin.routes";
import { AuthRouter } from "../modules/Auth/auth.routes";
const router = express.Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRouter,
  },
  {
    path: "/user",
    route: userRouter,
  },
  {
    path: "/admin",
    route: AdminRouter,
  },
];

moduleRoutes.forEach((data) => router.use(data.path, data.route));

export default router;
