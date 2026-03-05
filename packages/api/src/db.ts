import { drizzle } from "drizzle-orm/libsql";
import { env } from "#/env";
import * as schema from "#/schemas/tables";

export const db = drizzle(env.DB_FILE_NAME, { schema });
