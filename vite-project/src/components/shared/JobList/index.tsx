import { JobCard } from "@/components/shared/JobList/JobCard";
import type { Jobs } from "@/lib/jobsData";
import styles from "./styles.module.css";

export function JobList({ jobs }: { jobs: Jobs }) {
	const isEmpty = jobs.length === 0;

	return (
		<div className={`${styles.root} ${isEmpty ? styles.placeholder : ""}`}>
			{jobs.map((j) => (
				<JobCard job={j} key={j.id} />
			))}

			{isEmpty && <p>Sin resultados...</p>}
		</div>
	);
}
