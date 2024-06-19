import { pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const UsersSchema = pgTable('users', {
  id: serial('id').primaryKey(),
  firstName: varchar('first_name', { length: 128 }),
  lastName: varchar('last_name', { length: 128 }),
  email: varchar('email', { length: 256 }),
  password: varchar('password', { length: 256 }),
});

export type UserInferType = typeof UsersSchema.$inferSelect;