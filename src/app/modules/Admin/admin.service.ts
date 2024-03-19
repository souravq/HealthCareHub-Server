import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllAdminDataFromDB = async (param: any) => {
  const result = await prisma.admin.findMany({
    where: {
      OR: [
        {
          name: {
            contains: param.searchTerm,
            mode: "insensitive",
          },
        },
        {
          email: {
            contains: param.searchTerm,
            mode: "insensitive",
          },
        },
      ],
    },
  });
  return result;
};

export const AdminService = {
  getAllAdminDataFromDB,
};
