import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllAdminDataFromDB = async (param: any) => {
  const andCondition: Prisma.AdminWhereInput[] = [];
  if (param) {
    andCondition.push({
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
    });
  }

  console.dir(andCondition, { depth: "infinity" });

  const whereConditions: Prisma.AdminWhereInput = { AND: andCondition };

  const result = await prisma.admin.findMany({
    where: whereConditions,
  });
  return result;
};

export const AdminService = {
  getAllAdminDataFromDB,
};
