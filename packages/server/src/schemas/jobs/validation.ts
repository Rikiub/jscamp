import { createInsertSchema, createSelectSchema } from "drizzle-valibot";
import * as v from "valibot";
import { contents, jobs, technologies } from "./tables";

export const TechnologySchema = createSelectSchema(technologies);
export const ContentSchema = createSelectSchema(contents);

export const JobSchema = v.object({
	...createSelectSchema(jobs).entries,
	technologies: v.array(TechnologySchema),
});
export const FullJobSchema = v.object({
	...JobSchema.entries,
	content: ContentSchema,
});

export const NewJobSchema = v.object({
	...createInsertSchema(jobs).entries,
	technologies: v.array(v.string()),
	content: v.omit(createInsertSchema(contents), ["jobId"]),
});
export const UpdateJobSchema = v.partial(NewJobSchema);
