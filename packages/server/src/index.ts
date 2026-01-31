import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { DEFAULTS } from "./config";
import JobsRouter from "./jobs";

const app = new Hono()
	.use(cors({ origin: DEFAULTS.ALLOWED_ORIGINS }), logger())
	.route("/api/jobs", JobsRouter);

export type AppType = typeof app;

serve(
	{
		fetch: app.fetch,
		port: Number(process.env.PORT) || DEFAULTS.PORT,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
