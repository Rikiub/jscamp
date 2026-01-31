import * as v from "valibot";
import { JobSchema } from "#/schemas/jobs/validation";

const queryNumber = v.pipe(v.any(), v.transform(Number), v.number());

export const JobsParamSchema = v.optional(
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

export type JobsParams = v.InferOutput<typeof JobsParamSchema>;
export type JobsResponse = v.InferOutput<typeof JobsResponseSchema>;
