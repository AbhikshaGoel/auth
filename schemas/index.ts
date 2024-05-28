import * as zod from "zod";

export const LoginSchema = zod.object({
  email: zod.string().min(8,{message:"Emoployee Number 8 digit is required"}),
  password: zod.string().min(1, { message: "Password is required" }),
  code: zod.optional(
    zod.string().min(6, { message: "Code must be 6 characters" })
  ),
});
