import { PrismaClient, UserRole, UserStatus } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";
import { imageUpload } from "../../helpers/imageUpload";
import { IAuthUser, ImageUploadData } from "../../interface";

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

// Create Patient
const createPatient = async (payload: any) => {
  const file = payload.file;
  if (file) {
    const imageUploadToCloudinary: ImageUploadData =
      await imageUpload.imageUploadToCloudinary(file);

    payload.body.patient.profilePhoto = imageUploadToCloudinary?.secure_url;
  }

  const hashPassword = bcrypt.hashSync(payload.body.password, 12);

  const userData = {
    email: payload.body.patient.email,
    password: hashPassword,
    role: UserRole.PATIENT,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });
    const createPatientData = await transactionClient.patient.create({
      data: payload.body.patient,
    });
    return createPatientData;
  });
  return result;
};

// Get My Profile Data
const getMyProfile = async (user: IAuthUser) => {
  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
    },
  });
  let profileInfo;
  if (userInfo.role === UserRole.ADMIN) {
    profileInfo = await prisma.admin.findUniqueOrThrow({
      where: {
        email: userInfo.email,
      },
    });
  } else if (userInfo.role === UserRole.DOCTOR) {
    profileInfo = await prisma.doctor.findUniqueOrThrow({
      where: {
        email: userInfo.email,
      },
    });
  } else if (userInfo.role === UserRole.PATIENT) {
    profileInfo = await prisma.patient.findUniqueOrThrow({
      where: {
        email: userInfo.email,
      },
    });
  }
  return { ...userInfo, ...profileInfo };
};

// Update My Profile
const updateMyProfile = async (user: IAuthUser, file: any, payload: any) => {
  //const file = payload.file;
  if (file) {
    const imageUploadToCloudinary: ImageUploadData =
      await imageUpload.imageUploadToCloudinary(file);

    payload.profilePhoto = imageUploadToCloudinary?.secure_url;
  }

  const userInfo = await prisma.user.findUniqueOrThrow({
    where: {
      email: user?.email,
      status: UserStatus.ACTIVE,
    },
  });
  let profileInfo;
  if (userInfo.role === UserRole.ADMIN) {
    profileInfo = await prisma.admin.update({
      where: {
        email: userInfo.email,
      },
      data: payload,
    });
  } else if (userInfo.role === UserRole.DOCTOR) {
    profileInfo = await prisma.doctor.update({
      where: {
        email: userInfo.email,
      },
      data: payload,
    });
  } else if (userInfo.role === UserRole.PATIENT) {
    profileInfo = await prisma.patient.update({
      where: {
        email: userInfo.email,
      },
      data: payload,
    });
  }
  return { ...profileInfo };
};

export const userService = {
  createAdmin,
  createDoctor,
  createPatient,
  getMyProfile,
  updateMyProfile,
};
