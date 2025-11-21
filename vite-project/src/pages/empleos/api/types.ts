// Internal API

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

export interface JobsResponse {
    total: number;
    limit: number;
    offset: number;
    results: number;
    data: Job[];
}
