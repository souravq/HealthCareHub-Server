import { z } from "zod";

const createSpecialtiesValidation = z.object({
  title: z.string({
    required_error: "Specialties Title is required !!!",
  }),
});

export const SpecialtiesZodValidation = {
  createSpecialtiesValidation,
};
