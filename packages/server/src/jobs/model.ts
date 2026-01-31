import { and, eq, exists, inArray, like, or } from "drizzle-orm";
import { DEFAULTS } from "#/config.js";
import { db } from "#/db/index.js";
import type {
	FullJob,
	Job,
	NewJob,
	Technology,
	UpdateJob,
} from "#/db/schemas/jobs.js";
import * as schema from "#/db/schemas/jobs.js";
import type { JobsParams } from "./types.js";

export type Transaction = Parameters<Parameters<typeof db.transaction>[0]>[0];

export const JobsModel = {
	async getAll({
		search,
		technology,
		location,
		level,
		limit = DEFAULTS.LIMIT_PAGINATION,
		offset = DEFAULTS.LIMIT_OFFSET,
	}: JobsParams = {}): Promise<Job[]> {
		const filters = [];

		if (search) {
			const query = `%${search}%`;

			filters.push(
				or(
					like(schema.jobs.title, query),
					like(schema.jobs.company, query),
					exists(
						db
							.select()
							.from(schema.contents)
							.where(
								and(
									eq(schema.contents.jobId, schema.jobs.id),
									like(schema.contents.description, query),
								),
							),
					),
				),
			);
		}

		if (location) filters.push(eq(schema.jobs.location, location));
		if (level) filters.push(eq(schema.jobs.level, level));

		if (technology) {
			filters.push(
				exists(
					db
						.select()
						.from(schema.jobTechnologies)
						.innerJoin(
							schema.technologies,
							eq(schema.jobTechnologies.techId, schema.technologies.id),
						)
						.where(
							and(
								eq(schema.jobTechnologies.jobId, schema.jobs.id),
								eq(schema.technologies.name, technology),
							),
						),
				),
			);
		}

		const results = await db.query.jobs.findMany({
			where: and(...filters),
			limit,
			offset,
			with: { content: true, technologies: true },
		});
		return results;
	},

	async getById(jobId: string, tx?: Transaction): Promise<FullJob | null> {
		const handler = tx ?? db;

		const item = await handler.query.jobs.findFirst({
			where: (table, { eq }) => eq(table.id, jobId),
			with: { content: true, technologies: true },
		});

		if (!item) return null;
		return item;
	},

	async create(data: NewJob): Promise<FullJob> {
		const { content, technologies, ...job } = data;

		const result = await db.transaction(async (tx) => {
			const [jobItem] = await tx
				.insert(schema.jobs)
				.values(job)
				.returning({ id: schema.jobs.id });
			await tx
				.insert(schema.contents)
				.values({ ...content, jobId: jobItem.id });

			await JobsModel.syncJobTechnologies(tx, jobItem.id, technologies);
			return JobsModel.getById(jobItem.id, tx);
		});
		return result as FullJob;
	},

	async update(jobId: string, data: UpdateJob) {
		const { technologies, content, ...jobsData } = data;

		return await db.transaction(async (tx) => {
			await tx
				.update(schema.jobs)
				.set(jobsData)
				.where(eq(schema.jobs.id, jobId));

			if (content) {
				await tx
					.update(schema.contents)
					.set(content)
					.where(eq(schema.contents.jobId, jobId));
			}

			await JobsModel.syncJobTechnologies(tx, jobId, technologies);
		});
	},

	async delete(jobId: string) {
		db.delete(schema.jobs).where(eq(schema.jobs.id, jobId));
	},

	async getTags(): Promise<Technology[]> {
		return await db.select().from(schema.technologies);
	},

	async syncJobTechnologies(
		tx: Transaction,
		jobId: string,
		technologies: string[] = [],
	) {
		await tx
			.delete(schema.jobTechnologies)
			.where(eq(schema.jobTechnologies.jobId, jobId));

		const techIds = await tx
			.select({ id: schema.technologies.id })
			.from(schema.technologies)
			.where(inArray(schema.technologies.name, technologies));

		await tx.insert(schema.jobTechnologies).values(
			techIds.map((t) => ({
				jobId,
				techId: t.id,
			})),
		);
	},
};
