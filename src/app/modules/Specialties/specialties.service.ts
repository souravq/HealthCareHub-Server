import { PrismaClient } from "@prisma/client";
import { imageUpload } from "../../helpers/imageUpload";

const prisma = new PrismaClient();
const createSpecialties = async (req: any) => {
  if (req.file) {
    //console.log(req.file);
    const cloudinaryImage = await imageUpload.imageUploadToCloudinary(req.file);
    req.body.icon = cloudinaryImage.secure_url;
  }
  //console.log(req.body);
  const result = await prisma.specialties.create({
    data: req.body,
  });
  return result;
};

export const SpecialtiesService = {
  createSpecialties,
};
