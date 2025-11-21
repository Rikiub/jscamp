import { JobCard } from "@/pages/empleos/components/JobCard";
import type { Job } from "../../api/types";
import styles from "./styles.module.css";

export function JobList({ jobs }: { jobs?: Job[] }) {
	const isEmpty = !jobs || jobs.length === 0;

	return (
		<div className={`${styles.root} ${isEmpty ? styles.placeholder : ""}`}>
			{jobs?.map((j) => (
				<JobCard job={j} key={j.id} />
			))}

			{isEmpty && <p>Sin resultados...</p>}
		</div>
	);
}
