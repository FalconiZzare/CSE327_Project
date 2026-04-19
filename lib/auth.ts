import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { passkey } from "@better-auth/passkey";
import { nextCookies } from "better-auth/next-js";
import { admin as adminPlugin } from "better-auth/plugins";
import prisma from "@/lib/prisma";
import { ac, customer, chef, delivery, adminRole } from "@/lib/access";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql"
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }
  },
  plugins: [
    passkey(),
    nextCookies(),
    adminPlugin({
      ac,
      roles: { customer, chef, delivery, admin: adminRole },
      defaultRole: "customer",
      adminRoles: ["admin"]
    })
  ],
  advanced: {
    cookiePrefix: "crunch-time"
  }
});

export type Session = typeof auth.$Infer.Session;
