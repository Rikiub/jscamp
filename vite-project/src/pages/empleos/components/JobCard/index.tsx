import { Link } from "react-router";
import { Button } from "@/components/ui/Button";
import type { Job } from "@/features/jobs/types";
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

				<Link to={`/empleos/${job.id}`} viewTransition>
					<Button variant="primary">Detalles</Button>
				</Link>
			</header>

			<p>{job.description}</p>

			<footer className={styles.tags}>
				{job.tags.technology.map((tag) => (
					<span key={tag}>{tag}</span>
				))}
			</footer>
		</article>
	);
}
