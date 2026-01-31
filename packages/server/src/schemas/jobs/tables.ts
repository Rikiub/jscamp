import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const jobId = text()
	.primaryKey()
	.references(() => jobs.id, { onDelete: "cascade" });

export const jobs = sqliteTable("jobs", {
	id: text()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	title: text().notNull(),
	description: text().notNull(),
	company: text().notNull(),
	location: text().notNull(),
	level: text().notNull(),
});

export const contents = sqliteTable("job_contents", {
	jobId: jobId,
	description: text().notNull(),
	responsibilities: text().notNull(),
	requirements: text().notNull(),
	about: text().notNull(),
});

export const technologies = sqliteTable("technologies", {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
});

export const jobTechnologies = sqliteTable("job_technology", {
	jobId: jobId,
	techId: integer()
		.notNull()
		.references(() => technologies.id, { onDelete: "cascade" }),
});

export const jobsRelations = relations(jobs, ({ one, many }) => ({
	content: one(contents, {
		fields: [jobs.id],
		references: [contents.jobId],
	}),
	technologies: many(technologies),
}));
