import { Spinner } from "@/components/ui/Spinner";
import { JobCard } from "@/pages/empleos/components/JobCard";
import type { Job } from "../../api/types";
import styles from "./styles.module.css";

export function JobList({
	jobs,
	loading = false,
}: {
	jobs?: Job[];
	loading?: boolean;
}) {
	const isEmpty = !jobs || jobs.length === 0;

	return (
		<div className={`${styles.root} `}>
			<div
				className={`${isEmpty ? styles.empty : ""} ${loading ? styles.loading : ""}`}
			>
				{loading && <Spinner size={50} loading={loading} />}
				{!loading && jobs?.map((j) => <JobCard job={j} key={j.id} />)}
				{!loading && isEmpty && <p>Sin resultados...</p>}
			</div>
		</div>
	);
}
