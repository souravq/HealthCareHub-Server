import { AnyZodObject, z } from "zod";

const updateZod = z.object({
  body: z.object({
    name: z.string(),
    contactNumber: z.string(),
  }),
});

export const AdminValidation = {
  updateZod,
};
