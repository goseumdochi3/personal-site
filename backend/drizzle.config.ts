import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schemas/*",
  out: "./drizzle",
  dbCredentials: {
    user: process.env.DATABASE_USER || "",
    password: process.env.DATABASE_PASSWORD || "",
    host: process.env.DATABASE_HOST || "",
    port: parseInt(process.env.DATABASE_PORT || "0"),
    database: process.env.DATABASE_NAME || "",
    ssl: false
  },
});
