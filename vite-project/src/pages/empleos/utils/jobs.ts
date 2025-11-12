import data from "./jobs.json";

export interface Job {
    id: number;
    title: string;
    company: string;
    location: string;
    salary: string;
    description: string;
    tags: string[];
}

export type Jobs = Job[];

export function getJobs(): Jobs {
    return data;
}

const JOBS_CACHE = getJobs();

export function getTags(): string[] {
    const data: string[] = [];

    for (const j of JOBS_CACHE) {
        for (const t of j.tags) {
            if (data.includes(t)) break;
            data.push(t);
        }
    }

    return data;
}

export function getLocations(): string[] {
    const data: string[] = [];

    for (const j of JOBS_CACHE) {
        if (data.includes(j.location)) break;
        data.push(j.location);
    }

    return data;
}
