import express, { Application, Request, Response } from "express";
import { userRouter } from "./app/modules/User/user.routes";
import { AdminRouter } from "./app/modules/Admin/admin.routes";
const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Health Care Service is Open...");
});

app.use("/user", userRouter);

app.use("/admin", AdminRouter);

export default app;
