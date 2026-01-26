import { sValidator } from "@hono/standard-validator";
import { type Context, Hono } from "hono";
import { DEFAULTS } from "#/config.js";
import { JobsModel } from "./model.js";
import { JobsParamsSchema } from "./schemas.js";
import type { JobsResponse } from "./types.js";

const app = new Hono()
	// getAll
	.get("/", sValidator("query", JobsParamsSchema), async (c) => {
		const query = c.req.valid("query") ?? {};
		const { limit, offset } = query;
		const jobs = await JobsModel.getAll(query);

		const data: JobsResponse = {
			total: jobs.length,
			results: jobs.length,
			offset: offset || DEFAULTS.LIMIT_OFFSET,
			limit: limit || DEFAULTS.LIMIT_PAGINATION,
			data: jobs,
		};

		return c.json(data);
	})
	// create
	.post("/", async (c) => {
		const body = await c.req.json();
		const item = await JobsModel.create(body);
		return c.json(item);
	})
	// getById
	.get("/:id", async (c) => {
		const { id } = c.req.param();
		const item = await JobsModel.getById(id);

		return sendJson(c, item);
	})
	// update
	.put("/:id", async (c) => {
		const { id } = c.req.param();

		const body = await c.req.json();
		const item = await JobsModel.update(id, body);

		return sendJson(c, item);
	})
	// delete
	.delete("/:id", async (c) => {
		const { id } = c.req.param();
		const item = await JobsModel.delete(id);

		return sendJson(c, item);
	});

export default app;

function sendJson<T>(c: Context, item: T | null) {
	if (!item) return c.json({ error: "Job not found" }, 404);
	return c.json(item);
}
