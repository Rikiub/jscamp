import { defineConfig } from "drizzle-kit";
import { env } from "#/env";

export default defineConfig({
	out: "./drizzle",
	schema: "./src/schemas/**/tables.ts",
	dialect: "sqlite",
	dbCredentials: {
		url: env.DB_FILE_NAME,
	},
});
