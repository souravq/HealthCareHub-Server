import { Admin, Prisma, PrismaClient } from "@prisma/client";

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
  return {
    meta: {
      page: page,
      limit: limit,
    },
    data: result,
  };
};

// Get Admin Data By Id
const getAdminDataByIdFromDB = async (id: string) => {
  console.log(id);
  const result = await prisma.admin.findUnique({
    where: {
      id,
    },
  });
  return result;
};

// Update Admin Data By Id
const updateAdminDataById = async (id: string, bodyData: any) => {
  //Check admin id is valid or not
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.admin.update({
    where: {
      id,
    },
    data: bodyData,
  });
  return result;
};

// Delete Admin Data By Id
const deleteAdminDataById = async (id: string) => {
  //Check admin id is valid or not
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });

  const result = await prisma.$transaction(async (transactionClient) => {
    const adminDeletedData = await transactionClient.admin.delete({
      where: {
        id,
      },
    });

    const userDeletedData = await transactionClient.user.delete({
      where: {
        email: adminDeletedData.email,
      },
    });
  });
  return result;
};

export const AdminService = {
  getAllAdminDataFromDB,
  getAdminDataByIdFromDB,
  updateAdminDataById,
  deleteAdminDataById,
};
