import { PrismaClient, UserRole } from "@prisma/client";
const prisma = new PrismaClient();
import bcrypt from "bcrypt";

const createAdmin = async (data: any) => {
  const hashPassword = bcrypt.hashSync(data.password, 12);

  const userData = {
    email: data.admin.email,
    password: hashPassword,
    role: UserRole.ADMIN,
  };

  const result = await prisma.$transaction(async (transactionClient) => {
    await transactionClient.user.create({
      data: userData,
    });
    const createAdminData = await transactionClient.admin.create({
      data: data.admin,
    });
    return createAdminData;
  });
  return result;
};

export const userService = {
  createAdmin,
};
