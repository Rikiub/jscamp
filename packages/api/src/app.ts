import { Hono } from "hono";
import { cors } from "hono/cors";
import { logger } from "hono/logger";
import { env } from "#/env";
import JobsRouter from "#/routes/jobs";

export const app = new Hono()
	.use(cors({ origin: env.ALLOWED_ORIGINS }), logger())
	.route("/api/jobs", JobsRouter);

export type AppType = typeof app;
