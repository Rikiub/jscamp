import type * as v from "valibot";
import type * as s from "./validation";

export type Technology = v.InferOutput<typeof s.TechnologySchema>;
export type Content = v.InferOutput<typeof s.ContentSchema>;

export type Job = v.InferOutput<typeof s.JobSchema>;
export type FullJob = v.InferOutput<typeof s.FullJobSchema>;
export type NewJob = v.InferOutput<typeof s.NewJobSchema>;
export type UpdateJob = v.InferOutput<typeof s.UpdateJobSchema>;
