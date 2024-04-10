import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/libs/prisma";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        name: { label: "Name", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log(credentials);

        const userFound = await prisma.user.findUnique({
          where: {
            name: credentials.name,
          },
        });
        if (!userFound) {
          return null;
        }

        const isValid = userFound.password === credentials.password;

        if (!isValid) {
          return null;
        }

        return {
          id: userFound.id,
          name: userFound.name,
        };
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
