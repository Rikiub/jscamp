export interface Content {
	description: string;
	responsibilities: string;
	requirements: string;
	about: string;
}

export interface Tags {
	technology: string[];
	location: string;
	level: string;
}

export interface Job {
	id: string;
	title: string;
	company: string;
	location: string;
	description: string;
	tags: Tags;
}

export interface FullJob extends Job {
	content: Content;
}

export interface JobsFilter {
	search?: string;

	technology?: string;
	location?: string;
	level?: string;

	limit?: number;
	offset?: number;
}

export interface JobsResponse {
	total: number;
	limit: number;
	offset: number;
	results: number;
	data: Job[];
}

export type CreateJob = Omit<FullJob, "id">;
