import { DEFAULTS } from "../config.js";
import { JobsModel } from "./model.js";
import type { JobsResponse } from "./types.ts";
import { type Context, Hono } from "hono";

const app = new Hono();
export default app;

// getAll
app.get("/", async (c) => {
	const { limit, offset } = c.req.query();

	const jobs = await JobsModel.getAll(c.req.query());

	const data: JobsResponse = {
		total: jobs.length,
		results: jobs.length,
		offset: Number(offset) ?? DEFAULTS.LIMIT_OFFSET,
		limit: Number(limit) ?? DEFAULTS.LIMIT_PAGINATION,
		data: jobs,
	};

	return c.json(data);
});

// create
app.post("/", async (c) => {
	const body = await c.req.json();
	const item = await JobsModel.create(body);
	return c.json(item);
});

// getById
app.get("/:id", async (c) => {
	const { id } = c.req.param();
	const item = await JobsModel.getById(id);
	sendJson(c, item);
});

// update
app.put("/:id", async (c) => {
	const { id } = c.req.param();

	const body = await c.req.json();
	const item = await JobsModel.update(id, body);
	sendJson(c, item);
});

// delete
app.delete("/:id", async (c) => {
	const { id } = c.req.param();
	const item = await JobsModel.delete(id);
	sendJson(c, item);
});

function sendJson(c: Context, item: object | null) {
	if (item) {
		return c.json(item);
	} else {
		return c.json({ error: "Job not found" }, 404);
	}
}
