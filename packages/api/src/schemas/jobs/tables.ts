import { relations } from "drizzle-orm";
import {
	integer,
	primaryKey,
	sqliteTable,
	text,
} from "drizzle-orm/sqlite-core";

// Tables
export const job = sqliteTable("job", {
	id: text()
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	title: text().notNull(),
	description: text().notNull(),
	company: text().notNull(),
	location: text().notNull(),
	level: text().notNull(),
});

export const jobContent = sqliteTable("job_content", {
	jobId: text()
		.primaryKey()
		.references(() => job.id, { onDelete: "cascade" }),
	description: text().notNull(),
	responsibilities: text().notNull(),
	requirements: text().notNull(),
	about: text().notNull(),
});

export const technology = sqliteTable("technology", {
	id: integer().primaryKey({ autoIncrement: true }),
	name: text().notNull(),
});

// Junk
export const jobTechnology = sqliteTable(
	"job_technology",
	{
		jobId: text()
			.notNull()
			.references(() => job.id, { onDelete: "cascade" }),
		technologyId: integer()
			.notNull()
			.references(() => technology.id, { onDelete: "cascade" }),
	},
	(table) => [primaryKey({ columns: [table.jobId, table.technologyId] })],
);

// Relations
export const jobTechnologyRelations = relations(jobTechnology, ({ one }) => ({
	job: one(job, {
		fields: [jobTechnology.jobId],
		references: [job.id],
	}),
	technology: one(technology, {
		fields: [jobTechnology.technologyId],
		references: [technology.id],
	}),
}));

export const jobsRelations = relations(job, ({ one, many }) => ({
	content: one(jobContent, {
		fields: [job.id],
		references: [jobContent.jobId],
	}),
	technologies: many(jobTechnology),
}));
