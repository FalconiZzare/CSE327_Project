import { createAuthClient } from "better-auth/react";
import { passkeyClient } from "@better-auth/passkey/client";
import { adminClient } from "better-auth/client/plugins";
import { ac, customer, chef, delivery, adminRole } from "@/lib/access";

export const authClient = createAuthClient({
  plugins: [
    passkeyClient(),
    adminClient({
      ac,
      roles: { customer, chef, delivery, admin: adminRole }
    })
  ]
});

export const { signIn, signOut, useSession, getSession } = authClient;
