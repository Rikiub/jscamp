import { DEFAULTS } from "#/config.js";
import type {
	CreateJob,
	FullJob,
	Job,
	JobsParams,
	PartialJob,
} from "./types.js";

const _data = await import("./jobs.json", { with: { type: "json" } });
let jobs = _data.default as FullJob[];

export const JobsModel = {
	async getAll({
		search,
		technology,
		location,
		level,
		limit = DEFAULTS.LIMIT_PAGINATION,
		offset = DEFAULTS.LIMIT_OFFSET,
	}: JobsParams = {}): Promise<Job[]> {
		let filteredJobs = jobs;

		if (search) {
			const query = search?.toLowerCase() || "";

			filteredJobs = filteredJobs.filter((job) => {
				const fields = [
					job.title,
					job.description,
					job.company,
					job.location,
					...Object.values(job.tags),
				];

				return fields.flat().some((val) =>
					val?.toLowerCase().includes(query)
				);
			});
		}
		if (technology) {
			filteredJobs = filteredJobs.filter((job) =>
				job.tags.technology.includes(technology)
			);
		}
		if (location) {
			filteredJobs = filteredJobs.filter((job) =>
				job.tags.location.includes(location)
			);
		}
		if (level) {
			filteredJobs = filteredJobs.filter((job) =>
				job.tags.level.includes(level)
			);
		}

		filteredJobs = filteredJobs.slice(offset, offset + limit);
		return filteredJobs as Job[];
	},

	async getById(id: string): Promise<FullJob | null> {
		const item = jobs.filter((value) => value.id === id)[0];
		return item;
	},

	async create(data: CreateJob): Promise<FullJob> {
		const item = { ...data, id: crypto.randomUUID() };
		jobs.push(item);
		return item;
	},

	async update(id: string, data: CreateJob): Promise<FullJob | null> {
		const index = jobs.findIndex((item) => item.id === id);

		if (index !== -1) {
			const item: FullJob = { id, ...data };
			jobs[index] = item;
			return item;
		}

		return null;
	},

	async partialUpdate(
		id: string,
		data: PartialJob,
	): Promise<FullJob | null> {
		const index = jobs.findIndex((item) => item.id === id);

		if (index !== -1) {
			const item = { ...jobs[index], ...data };
			jobs = [...jobs.slice(0, index), item, ...jobs.slice(index + 1)];
			return item;
		}

		return null;
	},

	async delete(id: string): Promise<FullJob | null> {
		const item = await JobsModel.getById(id);

		if (item) {
			jobs = jobs.filter((job) => job.id !== item.id);
			return item;
		}

		return null;
	},
};
