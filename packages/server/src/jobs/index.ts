import { sValidator } from "@hono/standard-validator";
import { type Context, Hono } from "hono";
import { DEFAULTS } from "#/config.js";
import { JobsModel } from "./model.js";
import { CreateJobSchema, JobsParamsSchema } from "./schemas.js";
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
	.post("/", sValidator("json", CreateJobSchema), async (c) => {
		const json = c.req.valid("json");
		const item = await JobsModel.create(json);
		return c.json(item);
	})
	// getById
	.get("/:id", async (c) => {
		const { id } = c.req.param();
		const item = await JobsModel.getById(id);

		if (!item) return sendNotFound(c);
		return c.json(item);
	})
	// update
	.put("/:id", async (c) => {
		const { id } = c.req.param();

		const body = await c.req.json();
		const item = await JobsModel.update(id, body);

		if (!item) return sendNotFound(c);
		return c.body(null, 204);
	})
	// delete
	.delete("/:id", async (c) => {
		const { id } = c.req.param();
		const item = await JobsModel.delete(id);

		if (!item) return sendNotFound(c);
		return c.body(null, 204);
	});

export default app;

function sendNotFound(c: Context) {
	return c.json({ error: "Job not found" }, 404);
}
