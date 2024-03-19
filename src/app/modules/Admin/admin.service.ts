import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllAdminDataFromDB = async () => {
  const result = await prisma.admin.findMany();
  return result;
};

export const AdminService = {
  getAllAdminDataFromDB,
};
