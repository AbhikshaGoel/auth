// auth.ts
"use server"

import { signIn } from "@/auth"; // Adjust this import based on your project structure
// auth.ts (or wherever you handle authentication logic)

import { z } from 'zod';
import { LoginSchema } from '@/schemas';

export async function signInWithCredentials(values: z.infer<typeof LoginSchema>) {
  try {
    const { email, password } = values;
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false, // Adjust as per NextAuth options
    });
    console.log("result: " + result);

    if (result?.error) {
        console.log("result: ", result.error);
      //throw new Error(result.error);
      const message={
        message: "Invalid credentials",
        userId:email
      }
      return message;
    }

    // Optionally, handle success or return data
    return result;
  } catch (error:any) {
    console.log("error in server signIn function", error) 
    //new Error("Errorrrrrrr --------------------- error ",error);'
    const message={
        message: "Error in Sign"
      }
      return message;
    return null;
  }
}

