import { and, eq, exists, inArray, like, or } from "drizzle-orm";
import { DEFAULTS } from "#/config";
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
					like(table.jobs.title, query),
					like(table.jobs.company, query),
					exists(
						db
							.select()
							.from(table.contents)
							.where(
								and(
									eq(table.contents.jobId, table.jobs.id),
									like(table.contents.description, query),
								),
							),
					),
				),
			);
		}

		if (location) filters.push(eq(table.jobs.location, location));
		if (level) filters.push(eq(table.jobs.level, level));

		if (technology) {
			filters.push(
				exists(
					db
						.select()
						.from(table.jobTechnologies)
						.innerJoin(
							table.technologies,
							eq(table.jobTechnologies.techId, table.technologies.id),
						)
						.where(
							and(
								eq(table.jobTechnologies.jobId, table.jobs.id),
								eq(table.technologies.name, technology),
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

	async getById(jobId: string): Promise<FullJob | null> {
		const item = await db.query.jobs.findFirst({
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
				.insert(table.jobs)
				.values(job)
				.returning({ id: table.jobs.id });
			await tx.insert(table.contents).values({ ...content, jobId: jobItem.id });

			await JobsModel.syncJobTechnologies(tx, jobItem.id, technologies);
			return await JobsModel.getById(jobItem.id);
		});
		return result as FullJob;
	},

	async update(jobId: string, data: UpdateJob) {
		const { technologies, content, ...jobsData } = data;

		return await db.transaction(async (tx) => {
			await tx.update(table.jobs).set(jobsData).where(eq(table.jobs.id, jobId));

			if (content) {
				await tx
					.update(table.contents)
					.set(content)
					.where(eq(table.contents.jobId, jobId));
			}

			await JobsModel.syncJobTechnologies(tx, jobId, technologies);
		});
	},

	async delete(jobId: string) {
		db.delete(table.jobs).where(eq(table.jobs.id, jobId));
	},

	async getTags(): Promise<Technology[]> {
		return await db.select().from(table.technologies);
	},

	async syncJobTechnologies(
		tx: Transaction,
		jobId: string,
		technologies: string[] = [],
	) {
		await tx
			.delete(table.jobTechnologies)
			.where(eq(table.jobTechnologies.jobId, jobId));

		const techIds = await tx
			.select({ id: table.technologies.id })
			.from(table.technologies)
			.where(inArray(table.technologies.name, technologies));

		await tx.insert(table.jobTechnologies).values(
			techIds.map((t) => ({
				jobId,
				techId: t.id,
			})),
		);
	},
};
