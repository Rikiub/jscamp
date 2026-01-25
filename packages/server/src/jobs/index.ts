import { type Response, Router } from "express";
import { DEFAULTS } from "../config.ts";
import { JobsModel } from "./model.ts";
import type { JobsResponse } from "./types.ts";

export const JobsRouter = Router();

// getAll
JobsRouter.get("/", async (req, res) => {
	const { limit, offset } = req.query;

	const jobs = await JobsModel.getAll(req.query);

	const data: JobsResponse = {
		total: jobs.length,
		results: jobs.length,
		offset: Number(offset) ?? DEFAULTS.LIMIT_OFFSET,
		limit: Number(limit) ?? DEFAULTS.LIMIT_PAGINATION,
		data: jobs,
	};

	res.json(data);
});

// create
JobsRouter.post("/", async (req, res) => {
	const item = await JobsModel.create(req.body);
	res.json(item);
});

// getById
JobsRouter.get("/:id", async (req, res) => {
	const { id } = req.params;
	const item = await JobsModel.getById(id);
	sendJson(res, item);
});

// update
JobsRouter.put("/:id", async (req, res) => {
	const { id } = req.params;
	const item = await JobsModel.update(id, req.body);
	sendJson(res, item);
});

// delete
JobsRouter.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const item = await JobsModel.delete(id);
	sendJson(res, item);
});

function sendJson(res: Response, item: object | null) {
	if (item) {
		return res.json(item);
	} else {
		return res.status(404).json({ error: "Job not found" });
	}
}
