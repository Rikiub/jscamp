import { and, eq, exists, inArray, like, or } from "drizzle-orm";
import { db } from "#/db";
import * as table from "#/schemas/jobs/tables";
import type {
	FullJob,
	Job,
	NewJob,
	Technology,
	UpdateJob,
} from "#/schemas/jobs/types";
import type { JobsParams } from "./validation";

export type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0];

export const LIMIT_PAGINATION = 10;
export const LIMIT_OFFSET = 0;

export const JobsModel = {
	async getAll({
		search,
		technology,
		location,
		level,
		limit = LIMIT_PAGINATION,
		offset = LIMIT_OFFSET,
	}: JobsParams = {}): Promise<Job[]> {
		const filters = [];

		if (search) {
			const query = `%${search}%`;

			filters.push(
				or(
					like(table.job.title, query),
					like(table.job.company, query),
					exists(
						db
							.select()
							.from(table.jobContent)
							.where(
								and(
									eq(table.jobContent.jobId, table.job.id),
									like(table.jobContent.description, query),
								),
							),
					),
				),
			);
		}

		if (location) filters.push(eq(table.job.location, location));
		if (level) filters.push(eq(table.job.level, level));

		if (technology) {
			filters.push(
				exists(
					db
						.select()
						.from(table.jobTechnology)
						.innerJoin(
							table.technology,
							eq(table.jobTechnology.technologyId, table.technology.id),
						)
						.where(
							and(
								eq(table.jobTechnology.jobId, table.job.id),
								eq(table.technology.name, technology),
							),
						),
				),
			);
		}

		const results = (
			await db.query.job.findMany({
				limit,
				offset,
				with: {
					content: true,
					technologies: { with: { technology: true } },
				},
			})
		).map((job) => ({
			...job,
			technologies: job.technologies.map((t) => t.technology),
		}));

		return results;
	},

	async getById(jobId: string): Promise<FullJob | null> {
		const item = await db.query.job.findFirst({
			where: (table, { eq }) => eq(table.id, jobId),
			with: {
				content: true,
				technologies: { with: { technology: true } },
			},
		});

		if (!item) return null;

		return {
			...item,
			technologies: item.technologies.map((t) => t.technology),
		};
	},

	async create(data: NewJob): Promise<FullJob> {
		const { content, technologies, ...job } = data;

		const result = await db.transaction(async (tx) => {
			const [jobItem] = await tx
				.insert(table.job)
				.values(job)
				.returning({ id: table.job.id });
			await tx
				.insert(table.jobContent)
				.values({ ...content, jobId: jobItem.id });

			await JobsModel.syncJobTechnologies(tx, jobItem.id, technologies);
			return await JobsModel.getById(jobItem.id);
		});
		return result as FullJob;
	},

	async update(jobId: string, data: UpdateJob) {
		const { technologies, content, ...jobsData } = data;

		return await db.transaction(async (tx) => {
			await tx.update(table.job).set(jobsData).where(eq(table.job.id, jobId));

			if (content) {
				await tx
					.update(table.jobContent)
					.set(content)
					.where(eq(table.jobContent.jobId, jobId));
			}

			await JobsModel.syncJobTechnologies(tx, jobId, technologies);
		});
	},

	async delete(jobId: string) {
		db.delete(table.job).where(eq(table.job.id, jobId));
	},

	async getTags(): Promise<Technology[]> {
		return await db.select().from(table.technology);
	},

	async syncJobTechnologies(
		tx: Transaction,
		jobId: string,
		technologies: string[] = [],
	) {
		await tx
			.delete(table.jobTechnology)
			.where(eq(table.jobTechnology.jobId, jobId));

		const techIds = await tx
			.select({ id: table.technology.id })
			.from(table.technology)
			.where(inArray(table.technology.name, technologies));

		await tx.insert(table.jobTechnology).values(
			techIds.map((t) => ({
				jobId,
				technologyId: t.id,
			})),
		);
	},
};
