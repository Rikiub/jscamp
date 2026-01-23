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
    id: number;
    title: string;
    company: string;
    location: string;
    description: string;
    tags: Tags;
}

export type FullJob = { content: Content } & Job;

export interface JobsResponse {
    total: number;
    limit: number;
    offset: number;
    results: number;
    data: Job[];
}
