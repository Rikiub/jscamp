import type * as v from "valibot";
import type * as s from "./schemas.js";

export type Content = v.InferOutput<typeof s.ContentSchema>;
export type Tags = v.InferOutput<typeof s.TagsSchema>;
export type Job = v.InferOutput<typeof s.JobSchema>;
export type FullJob = v.InferOutput<typeof s.FullJobSchema>;
export type CreateJob = v.InferOutput<typeof s.CreateJobSchema>;
export type JobsParams = v.InferOutput<typeof s.JobsParamsSchema>;
export type JobsResponse = v.InferOutput<typeof s.JobsResponseSchema>;
