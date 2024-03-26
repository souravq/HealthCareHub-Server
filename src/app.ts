import express, { Application, NextFunction, Request, Response } from "express";
import router from "./app/routes";
import { StatusCodes } from "http-status-codes";
import { globalErrorHandler } from "./app/middlewares/globalErrorhandler";

import cookieParser from "cookie-parser";

const app: Application = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Health Care Service is Open...");
});

app.use("/api/v1", router);

app.use(globalErrorHandler);

export default app;
