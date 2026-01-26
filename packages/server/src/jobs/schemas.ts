import * as v from "valibot";

// Sub-Schemas
export const ContentSchema = v.object({
	description: v.string(),
	responsibilities: v.string(),
	requirements: v.string(),
	about: v.string(),
});

export const TagsSchema = v.object({
	technology: v.array(v.string()),
	location: v.string(),
	level: v.string(),
});

// Job Schema
export const JobSchema = v.object({
	id: v.string(),
	title: v.string(),
	company: v.string(),
	location: v.string(),
	description: v.string(),
	tags: TagsSchema,
});

// FullJob extends Job
export const FullJobSchema = v.object({
	...JobSchema.entries,
	content: ContentSchema,
});

export const CreateJobSchema = v.omit(FullJobSchema, ["id"]);
export const PartialJobSchema = v.partial(CreateJobSchema);

// Response
const queryNumber = v.pipe(v.any(), v.transform(Number), v.number());

export const JobsParamsSchema = v.optional(
	v.partial(
		v.object({
			search: v.string(),
			technology: v.string(),
			location: v.string(),
			level: v.string(),
			limit: queryNumber,
			offset: queryNumber,
		}),
	),
);

export const JobsResponseSchema = v.object({
	total: v.number(),
	limit: v.number(),
	offset: v.number(),
	results: v.number(),
	data: v.array(JobSchema),
});
