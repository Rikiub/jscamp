import type { FullJob, JobsFilter, JobsResponse } from "@project/server";
import { useEffect, useState } from "react";

const API_ENDPOINT = "http://localhost:3000/api/jobs";

export function useJobsAll(filters: JobsFilter = {}) {
	const [jobs, setJobs] = useState<JobsResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const params = new URLSearchParams();

		if (filters.search) params.append("search", filters.search);
		if (filters.technology) {
			params.append("technology", filters.technology);
		}
		if (filters.location) {
			params.append("location", filters.location);
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
				setLoading(true);

				const res = await fetch(`${API_ENDPOINT}?${params.toString()}`);
				if (!res.ok) throw new Error();

				const json: JobsResponse = await res.json();
				setJobs(json);
			} catch (error) {
				if (error instanceof Error) setError(error.message);
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
		error,
	};
}

export async function getJob(id: string): Promise<FullJob> {
	const res = await fetch(`${API_ENDPOINT}/${id}`);
	if (!res.ok) throw new Error();
	return await res.json();
}
