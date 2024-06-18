import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "./schemas";
import { getUserFromDb } from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
      },
      authorize: async (credentials) => {
        try {
          // Parse credentials using LoginSchema
          const { email, password } = await LoginSchema.parseAsync(credentials);
          //console.log("user")

          // Check if user authentication succeeds
          const isLoginSuccess = await getUserFromDb(email, password);
          //console.log("KNBKN ", isLoginSuccess, " email ", email);


          let userInfo={};

          if (!isLoginSuccess) {
            // Return a failed login response
            userInfo = {
              id: "login failed", // Custom property indicating login failure
              msg: "Invalid credentials", // Optional: provide error message for client-side handling
            };
            console.log("user information", userInfo);
            return userInfo;
          }

          // Return successful login response
          return {
            id: "login success", // Custom property indicating login success
            msg:email, // Optionally include additional user information
          };
        } catch (error) {
          console.error("Error during authorization:", error);
          throw new Error("Error occurred during authorization");
        }
      },
    }),
  ],
});
