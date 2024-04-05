import express, { NextFunction, Request, Response } from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";
import { imageUpload } from "../../helpers/imageUpload";
import { userValidation } from "./user.validation";
import { UserRole } from "@prisma/client";
const router = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(process.cwd(), "uploads"));
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix);
//   },
// });

// const upload = multer({ storage: storage });

// // Cloudinary
// cloudinary.config({
//   cloud_name: "djnkmibzv",
//   api_key: "132877126913535",
//   api_secret: "8rLrAPyE2lUYvWFdqOsjP_sf1cI",
// });

// cloudinary.uploader.upload(
//   "https://upload.wikimedia.org/wikipedia/commons/a/ae/Olympic_flag.jpg",
//   { public_id: "olympic_flag" },
//   function (error, result) {
//     console.log(result);
//   }
// );

router.post(
  "/",
  auth("SUPER_ADMIN", "ADMIN", "DOCTOR"),
  imageUpload.upload.single("file"),
  (req: Request, res: Response, next: NextFunction) => {
    req.body = userValidation.createAdminValidation.parse(
      JSON.parse(req.body.data)
    );
    return userController.createAdmin(req, res);
  }
);

router.get(
  "/myprofile",
  auth(UserRole.SUPER_ADMIN, UserRole.ADMIN, UserRole.DOCTOR, UserRole.PATIENT),
  userController.getMyProfile
);

export const userRouter = router;
