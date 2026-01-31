import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schemas/index.js";

export const db = drizzle(process.env.DB_FILE_NAME!, { schema });
