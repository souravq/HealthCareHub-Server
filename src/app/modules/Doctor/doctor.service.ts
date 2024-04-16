import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const updateDoctor = async (doctorId: string, payload: any) => {
  await prisma.doctor.findUniqueOrThrow({
    where: {
      id: doctorId,
    },
  });
  const result = await prisma.doctor.update({
    where: {
      id: doctorId,
    },
    data: payload,
  });
  return result;
};

export const DoctorService = {
  updateDoctor,
};
