import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllAdminDataFromDB = async (param: any) => {
  const andCondition: Prisma.AdminWhereInput[] = [];

  const adminSearchableField = ["name", "email"];
  if (param) {
    andCondition.push({
      OR: adminSearchableField.map((field) => {
        return {
          [field]: {
            contains: param.searchTerm,
            mode: "insensitive",
          },
        };
      }),
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
