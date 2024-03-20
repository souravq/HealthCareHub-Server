import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getAllAdminDataFromDB = async (param: any) => {
  const { searchTerm, page, limit } = param;
  console.log(searchTerm);
  const andCondition: Prisma.AdminWhereInput[] = [];

  const adminSearchableField = ["name", "email"];
  if (searchTerm) {
    andCondition.push({
      OR: adminSearchableField.map((field) => {
        return {
          [field]: {
            contains: searchTerm,
            mode: "insensitive",
          },
        };
      }),
    });
  }

  //   console.log(filterdata);
  //   if (Object.keys(filterdata).length > 0) {
  //     andCondition.push({
  //       AND: Object.keys(filterdata).map((key) => {
  //         return {
  //           [key]: {
  //             equals: filterdata[key],
  //           },
  //         };
  //       }),
  //     });
  //   }

  console.dir(andCondition, { depth: "infinity" });

  const whereConditions: Prisma.AdminWhereInput = { AND: andCondition };

  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip: (parseInt(page) - 1) * limit,
    take: parseInt(limit),
  });
  return result;
};

export const AdminService = {
  getAllAdminDataFromDB,
};
