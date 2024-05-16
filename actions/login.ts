"use server";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";

import * as z from "zod";
export const login = async (
  value: z.infer<typeof LoginSchema>,
  callBackUrl?: string | null
) => {
  const validatedFields = LoginSchema.safeParse(value);
  if (!validatedFields.success) {
    return {
      error: "Invalid fields",
    };
  }
  const { email, password, code } = validatedFields.data;
  //const existingUser = await getUserByEmail(email);
};
