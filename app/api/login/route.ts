import { LoginSchema } from "@/schemas";
import { NextResponse } from "next/server";

const ldap = require('ldapjs');

import * as z from "zod";

// Assuming you have functions for authentication, authorization, and session management

// Example authentication function (replace with your actual authentication logic)
const authenticateUser = async (email: string, password: string) => {
  // Initialize LDAP client
  const client = ldap.createClient({ url: 'ldap://10.52.25.27:3268' });
  console.log("creating connections");

  // Construct the user's DN (Distinguished Name) including the OU
  const dn = `uid=${email},dc=bd,dc=corporate,dc=ds, dc=indianoil,dc=in`; // Modify this according to your LDAP structure

  // Attempt to bind with the user's DN and password
  return new Promise<boolean>((resolve) => {
    //console.log("hitting ad");
    client.bind(dn, password, (err: any) => {
        //console.log("hitting binding");

      if (err) {
        console.error('LDAP authentication failed---', err);
        resolve(false);
      } else {
        console.log('LDAP authentication successful');
        resolve(true);
      }
      // Close the LDAP connection
      client.unbind();
    });
  });
};

export const POST = async (req: Request, res: Response) => {
  try {
    // Await the result of req.json() to get the actual form data
    const value: z.infer<typeof LoginSchema> = await req.json();

    const validatedFields = LoginSchema.safeParse(value);
    if (!validatedFields.success) {
      return NextResponse.json({
        error: "Invalid fields",
        status: 400, // Bad request
      });
    }

    const { email, password } = validatedFields.data;
    console.log("user id before ad", email);

    // Authenticate user
    const isAuthenticated = await authenticateUser(email, password);
    console.log("user id ",email," authitacted", isAuthenticated);

    // You may want to provide a success response
    return NextResponse.json({
      Message: "Authentication successful",
      status: 200,
    });
  } catch (error) {
    console.error("API endpoint error:", error);
    // Handle errors and provide an appropriate response
    return NextResponse.json({
      Message: "Internal server error",
      status: 500,
    });
  }
};
