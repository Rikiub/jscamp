import type { FullJob, JobsFilter, JobsResponse } from "@project/server/jobs";
import { getClient } from "@project/server/client";
import { useEffect, useState } from "react";

export function useJobsAll(filters: JobsFilter = {}) {
	const [jobs, setJobs] = useState<JobsResponse | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function fetchJobs() {
			try {
				setLoading(true);

				const res = await getClient().api.jobs.$get({ query: filters });
				if (!res.ok) return Error();

				const json = await res.json();
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
	const res = await getClient().api.jobs[':id'].$get({param: {id: id}});
	if (!res.ok) throw new Error();
	return await res.json();
}
