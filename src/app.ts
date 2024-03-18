import express, { Application, Request, Response } from "express";
import { userRouter } from "./app/modules/User/user.routes";
const app: Application = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Health Care Service is Open...");
});

app.use("/user", userRouter);

export default app;
