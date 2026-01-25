import type { Request, Response } from "express";
import { DEFAULTS } from "../config.ts";
import { JobsModel } from "./jobs.model.ts";
import type { JobsResponse } from "./types";

export const JobsController = {
	async getAll(req: Request, res: Response) {
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
	},

	async getById(req: Request, res: Response) {
		const { id } = req.params;
		const item = await JobsModel.getById(id as string);
		sendJson(res, item);
	},

	async create(req: Request, res: Response) {
		const item = await JobsModel.create(req.body);
		res.json(item);
	},

	async update(req: Request, res: Response) {
		const { id } = req.params;
		const item = await JobsModel.update(id as string, req.body);
		sendJson(res, item);
	},

	async delete(req: Request, res: Response) {
		const { id } = req.params;
		const item = await JobsModel.delete(id as string);
		sendJson(res, item);
	},
};

function sendJson(res: Response, item: object | null) {
	if (item) {
		return res.json(item);
	} else {
		return res.status(404).json({ error: "Job not found" });
	}
}
