import type { Job } from "@/utils/jobsData.ts";
import styles from "./styles.module.css";

export function JobCard({ job }: { job: Job }) {
	return (
		<article className={styles.root}>
			<header>
				<div>
					<h2>{job.title}</h2>
					<p>
						{job.company} | {job.location}
					</p>
				</div>

				<button type="button">Aplicar</button>
			</header>

			<p>{job.description}</p>
		</article>
	);
}
