import express, { Application, Request, Response } from "express";
import router from "./app/routes";
const app: Application = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Health Care Service is Open...");
});

app.use("/api/v1", router);

export default app;
