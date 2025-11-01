import { JobCard } from "@/components/shared/JobCard";
import type { Jobs } from "@/utils/jobsData";
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
