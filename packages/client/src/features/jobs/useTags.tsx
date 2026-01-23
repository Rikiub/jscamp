import { useMemo } from "react";
import { useJobsAll } from "./useJobs";

export interface AllTags {
	technology: string[];
	location: string[];
	level: string[];
}

export function useTags(): [AllTags | undefined, boolean] {
	const { jobs, loading } = useJobsAll();

	const technology = new Set<string>();
	const location = new Set<string>();
	const level = new Set<string>();

	const tags = useMemo(() => {
		if (loading) return;
		if (!jobs) return;

		for (const job of jobs.data) {
			for (const t of job.tags.technology) technology.add(t);
			location.add(job.tags.location);
			level.add(job.tags.level);
		}

		return {
			technology: Array.from(technology),
			location: Array.from(location),
			level: Array.from(level),
		};
	}, [jobs, loading, level, location, technology]);

	return [tags, loading];
}
