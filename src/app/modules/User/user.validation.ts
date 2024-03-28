import z from "zod";

const createAdminValidation = z.object({
  password: z.string({
    required_error: "Password is required",
  }),
  admin: z.object({
    name: z.string({
      required_error: "Name is required",
    }),
    email: z.string({
      required_error: "Email Id is required",
    }),
    contactNumber: z.string({
      required_error: "Contact Number is required",
    }),
  }),
});

export const userValidation = {
  createAdminValidation,
};
