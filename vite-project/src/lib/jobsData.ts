import data from "@/assets/data.json";

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

export function getTags(jobs: Jobs): string[] {
    const data: string[] = [];

    for (const j of jobs) {
        for (const t of j.tags) {
            if (data.includes(t)) break;
            data.push(t);
        }
    }

    return data;
}

export function getLocations(jobs: Jobs): string[] {
    const data: string[] = [];

    for (const j of jobs) {
        if (data.includes(j.location)) break;
        data.push(j.location);
    }

    return data;
}
