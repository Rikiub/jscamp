import * as v from "valibot";

const EnvSchema = v.object({
	DB_FILE_NAME: v.string(),
});

const result = v.safeParse(EnvSchema, process.env);
if (!result.success) {
	console.error("Invalid environment variables:", v.flatten(result.issues));
	process.exit();
}

export const env = result.output;
