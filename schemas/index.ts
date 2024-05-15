import * as zod from "zod";

export const LoginSchema = zod.object({
  email: zod
    .string({
      invalid_type_error: "Must be a string", // first one does not have message prop
    })
    .email({ message: "please provide a valid employee number" }),
  password: zod.string().min(1, { message: "Password is required" }),
  code: zod.optional(
    zod.string().min(6, { message: "Code must be 6 characters" })
  ),
});
