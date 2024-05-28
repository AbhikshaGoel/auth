import { LoginSchema } from "@/schemas";
import { NextResponse } from "next/server";
const ldap = require('ldapjs');
import * as z from "zod";

const authenticateUser = async (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    const client = ldap.createClient({ url: 'ldap://10.52.25.27:389' });
    const uid = email + "@ds.indianoil.in";
    const searchBase = "dc=ds,dc=indianoil,dc=in";

    client.bind(uid, password, (err: any) => {
      if (err) {
        console.error('LDAP bind failed:', err);
        client.unbind((unbindErr: any) => {
          if (unbindErr) {
            console.error('LDAP unbind failed:', unbindErr);
          }
          reject(err);
        });
      } else {
        const opts = {
          filter: `(sAMAccountName=${email})`,
          scope: 'sub',
          attributes: ['dn', 'sn', 'cn'],
        };

        client.search('ou=users,dc=ds,dc=indianoil,dc=in', opts, (searchErr: any, searchRes: any) => {
          if (searchErr) {
            console.error('LDAP search error:', searchErr);
            client.unbind((unbindErr: any) => {
              if (unbindErr) {
                console.error('LDAP unbind failed:', unbindErr);
              }
              reject(searchErr);
            });
          } else {
            searchRes.on('searchEntry', (entry: any) => {
              console.log('Found user:', entry.object);
              client.unbind((unbindErr: any) => {
                if (unbindErr) {
                  console.error('LDAP unbind failed:', unbindErr);
                }
                resolve(entry.object); // Resolving with user object
              });
            });

            searchRes.on('error', (searchErr: any) => {
              console.error('LDAP search error:', searchErr);
              client.unbind((unbindErr: any) => {
                if (unbindErr) {
                  console.error('LDAP unbind failed:', unbindErr);
                }
                reject(searchErr);
              });
            });
          }
        });
      }
    });
  });
};

export const POST = async (req: Request, res: Response) => {
  try {
    const value: z.infer<typeof LoginSchema> = await req.json();

    const validatedFields = LoginSchema.safeParse(value);
    if (!validatedFields.success) {
      return NextResponse.json({
        error: "Invalid fields",
        status: 400,
      });
    }

    const { email, password } = validatedFields.data;

    const isAuthenticated = await authenticateUser(email, password);

    return NextResponse.json({
      Message: "Authentication successful",
      status: 200,
      user: isAuthenticated // Sending authenticated user object in response
    });
  } catch (error) {
    console.error("API endpoint error:", error);
    return NextResponse.json({
      Message: "Internal server error",
      status: 500,
    });
  }
};
