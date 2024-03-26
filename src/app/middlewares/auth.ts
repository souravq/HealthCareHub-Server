import { NextFunction, Request, Response } from "express";
import { jwtHelper } from "../helpers/jwtHelper";
import config from "../../config";

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;
      console.log({ token });
      if (!token) {
        throw new Error("You are not Authorized");
      }
      const verifiedUser = jwtHelper.verifyToken(
        token,
        config.jwt_secret as string
      );
      console.log(verifiedUser);

      if (roles.length > 0 && !roles.includes(verifiedUser.role)) {
        throw new Error("You are not Authorized");
      }
      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
