import { PrismaClient, UserRole } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";
import { imageUpload } from "../../helpers/imageUpload";
import { ImageUploadData } from "../../interface";

const createAdmin = async (req: any) => {
  const file = req.file;
  if (file) {
    const imageUploadToCloudinary: ImageUploadData =
      await imageUpload.imageUploadToCloudinary(file);

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

// Get My Profile Data
const getMyProfile = async (user: any) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: user.email,
    },
  });
  let profileInfo;
  if (userInfo.role === UserRole.ADMIN) {
    profileInfo = await prisma.admin.findUniqueOrThrow({
      where: {
        email: userInfo.email,
      },
    });
  }
  return { ...userInfo, ...profileInfo };
};

export const userService = {
  createAdmin,
  getMyProfile,
};
