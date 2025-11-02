import { JobCard } from "@/components/shared/JobList/JobCard";
import type { Jobs } from "@/lib/jobsData";
import styles from "./styles.module.css";

export function JobList({ jobs }: { jobs: Jobs }) {
	return (
		<div className={styles.root}>
			{jobs.map((j) => (
				<JobCard job={j} key={j.id} />
			))}
		</div>
	);
}
