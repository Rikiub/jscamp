import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { env } from "./env";
import JobsRouter from "./routes/jobs";

const app = new Hono()
	.use(cors({ origin: env.ALLOWED_ORIGINS }), logger())
	.route("/api/jobs", JobsRouter);

export type AppType = typeof app;

serve(
	{
		fetch: app.fetch,
		port: env.PORT,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
