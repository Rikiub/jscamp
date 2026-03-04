import { createInsertSchema, createSelectSchema } from "drizzle-valibot";
import * as v from "valibot";
import { jobContent, job, technology } from "./tables";

export const TechnologySchema = createSelectSchema(technology);
export const ContentSchema = createSelectSchema(jobContent);

export const JobSchema = v.object({
	...createSelectSchema(job).entries,
	technologies: v.array(TechnologySchema),
});
export const FullJobSchema = v.object({
	...JobSchema.entries,
	content: ContentSchema,
});

export const NewJobSchema = v.object({
	...createInsertSchema(job).entries,
	technologies: v.array(v.string()),
	content: v.omit(createInsertSchema(jobContent), ["jobId"]),
});
export const UpdateJobSchema = v.partial(NewJobSchema);
