import "dotenv/config";
import * as v from "valibot";

const EnvSchema = v.object({
	DB_FILE_NAME: v.string(),
	PORT: v.pipe(v.string(), v.transform(Number)),
	ALLOWED_ORIGINS: v.pipe(
		v.string(),
		v.transform((s) => JSON.parse(s)),
		v.array(v.string()),
	),
});

const result = v.safeParse(EnvSchema, process.env);
if (!result.success) {
	console.error("Invalid environment variables:", v.flatten(result.issues));
	process.exit();
}

export const env = result.output;
