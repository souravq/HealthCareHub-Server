import { PrismaClient, UserRole } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";
import { imageUpload } from "../../helpers/imageUpload";
import { ImageUploadData } from "../../interface";

// Create Admin
const createAdmin = async (payload: any) => {
  const file = payload.file;
  if (file) {
    const imageUploadToCloudinary: ImageUploadData =
      await imageUpload.imageUploadToCloudinary(file);

    payload.body.admin.profilePhoto = imageUploadToCloudinary?.secure_url;
  }

  const hashPassword = bcrypt.hashSync(payload.body.password, 12);

  const userData = {
    email: payload.body.admin.email,
    password: hashPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });
    const createAdminData = await transactionClient.admin.create({
      data: payload.body.admin,
    });
    return createAdminData;
  });
  return result;
};

// Create Doctor
const createDoctor = async (payload: any) => {
  const file = payload.file;
  if (file) {
    const imageUploadToCloudinary: ImageUploadData =
      await imageUpload.imageUploadToCloudinary(file);

    payload.body.doctor.profilePhoto = imageUploadToCloudinary?.secure_url;
  }

  const hashPassword = bcrypt.hashSync(payload.body.password, 12);

  const userData = {
    email: payload.body.doctor.email,
    password: hashPassword,
    role: UserRole.DOCTOR,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });
    const createDoctorData = await transactionClient.doctor.create({
      data: payload.body.doctor,
    });
    return createDoctorData;
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
  createDoctor,
  getMyProfile,
};
