import { sValidator } from "@hono/standard-validator";
import { type Context, Hono } from "hono";
import { NewJobSchema, UpdateJobSchema } from "#/schemas/jobs/validation";
import { JobsModel, LIMIT_OFFSET, LIMIT_PAGINATION } from "./model";
import { JobsParamSchema, type JobsResponse } from "./validation";

const app = new Hono()
	// getAll
	.get("/", sValidator("query", JobsParamSchema), async (c) => {
		const query = c.req.valid("query") ?? {};
		const { limit, offset } = query;
		const jobs = await JobsModel.getAll(query);

		const data: JobsResponse = {
			total: jobs.length,
			results: jobs.length,
			offset: offset || LIMIT_OFFSET,
			limit: limit || LIMIT_PAGINATION,
			data: jobs,
		};

		return c.json(data);
	})
	// getById
	.get("/:id", async (c) => {
		const { id } = c.req.param();
		const item = await JobsModel.getById(id);

		if (!item) return sendNotFound(c);
		return c.json(item);
	})
	// create
	.post("/", sValidator("json", NewJobSchema), async (c) => {
		const json = c.req.valid("json");
		const item = await JobsModel.create(json);
		return c.json(item);
	})
	// update
	.put("/:id", sValidator("json", UpdateJobSchema), async (c) => {
		const { id } = c.req.param();
		const json = c.req.valid("json");

		await JobsModel.update(id, json);
		return c.body(null, 204);
	})
	// delete
	.delete("/:id", async (c) => {
		const { id } = c.req.param();
		await JobsModel.delete(id);
		return c.body(null, 204);
	});

export default app;

function sendNotFound(c: Context) {
	return c.json({ error: "Job not found" }, 404);
}
