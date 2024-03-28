import { PrismaClient, UserRole } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";
import { imageUpload } from "../../helpers/imageUpload";

const createAdmin = async (req: any) => {
  const file = req.file;
  if (file) {
    const imageUploadToCloudinary = await imageUpload.imageUploadToCloudinary(
      file
    );
    req.body.admin.profilePhoto = imageUploadToCloudinary?.secure_url;
  }

  const hashPassword = bcrypt.hashSync(req.body.password, 12);

  const userData = {
    email: req.body.admin.email,
    password: hashPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });
    const createAdminData = await transactionClient.admin.create({
      data: req.body.admin,
    });
    return createAdminData;
  });
  return result;
};

export const userService = {
  createAdmin,
};
