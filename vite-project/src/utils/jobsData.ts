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
