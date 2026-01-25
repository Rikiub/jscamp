import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { DEFAULTS } from "./config.js";
import { cors } from "hono/cors";
import JobsRouter from "./jobs/index.js";
import { logger } from "hono/logger";

const app = new Hono();
export type AppType = typeof app;

app.use(cors({ origin: DEFAULTS.ALLOWED_ORIGINS }), logger());
app.route("/api/jobs", JobsRouter);

serve(
	{
		fetch: app.fetch,
		port: Number(process.env.PORT) ?? DEFAULTS.PORT,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
