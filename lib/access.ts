import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

const statement = {
  ...defaultStatements,
  order: ["create", "view", "update", "cancel"],
  dish: ["create", "view", "update", "delete"]
} as const;

export const ac = createAccessControl(statement);

export const customer = ac.newRole({
  order: ["create", "view", "cancel"],
  dish: ["view"]
});

export const chef = ac.newRole({
  order: ["view", "update"],
  dish: ["view"]
});

export const delivery = ac.newRole({
  order: ["view", "update"],
  dish: ["view"]
});

export const adminRole = ac.newRole({
  order: ["view"],
  dish: ["create", "view", "update", "delete"],
  ...adminAc.statements
});

export type AppRole = "customer" | "chef" | "delivery" | "admin";
