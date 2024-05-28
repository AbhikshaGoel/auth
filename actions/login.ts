import { LoginSchema } from "@/schemas";
const ldap = require('ldapjs');

import * as z from "zod";

// Assuming you have functions for authentication, authorization, and session management

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
  const { email, password } = validatedFields.data;
  console.log("user id before ad",email);

  // Authenticate user
  const isAuthenticated = await authenticateUser(email, password);
  console.log("user id",email);

};

// Example authentication function (replace with your actual authentication logic)
// Example authentication function with OU (Organizational Unit)
const authenticateUser = async (email: string, password: string) => {
  // Initialize LDAP client
  const client = ldap.createClient({ url: 'ldap://10.52.25.27:3268' });

  // Construct the user's DN (Distinguished Name) including the OU
  const dn = `uid=${email},dc=bd,dc=corporate,dc=ds, dc=indianoil,dc=in`; // Modify this according to your LDAP structure

  // Attempt to bind with the user's DN and password
  // client.bind(email,password,function(error:any){
  //   console.log("ldap bind error");
  // })
  
    client.bind(dn, password, (err: any) => {
      if (err) {
        console.error('LDAP authentication failed', err);
        return false;
      } else {
        console.log('LDAP authentication successful');
        return true;
      }
      // Close the LDAP connection
      client.unbind();
    });
  
};




