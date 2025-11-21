import { useEffect, useState } from "react";
import { convertRawApi, type RawJobsResponse } from "../utils/mapper";
import type { JobsResponse } from "./types";

const API_ENDPOINT = "https://jscamp-api.vercel.app/api/jobs";

export interface Filters {
    search?: string;
    technology?: string;
    location?: string;
    level?: string;
    limit?: number;
    offset?: number;
}

export function useJobs(filters: Filters = {}) {
    const [jobs, setJobs] = useState<JobsResponse | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const params = new URLSearchParams();

        if (filters.search) params.append("text", filters.search);
        if (filters.technology) {
            params.append("technology", filters.technology);
        }
        if (filters.location) {
            params.append("type", filters.location);
        }
        if (filters.level) {
            params.append("level", filters.level);
        }
        if (filters.limit) {
            params.append("limit", filters.limit.toString() ?? "9000");
        }
        if (filters.offset) {
            params.append("offset", filters.offset.toString());
        }

        async function fetchJobs() {
            try {
                const res = await fetch(`${API_ENDPOINT}?${params.toString()}`);
                const json: RawJobsResponse = await res.json();
                const data = convertRawApi(json);
                setJobs(data);
            } catch (error) {
                console.log("Error fetching jobs:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchJobs();
    }, [
        filters.location,
        filters.level,
        filters.limit,
        filters.search,
        filters.technology,
        filters.offset,
    ]);

    return {
        jobs,
        loading,
    };
}
