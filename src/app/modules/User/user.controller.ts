import { Request, Response } from "express";
import { userService } from "./user.service";

const getUser = async (req: Request, res: Response) => {
  const result = await userService.getUserData();
  res.send({
    data: result,
  });
};

export const userController = {
  getUser,
};
