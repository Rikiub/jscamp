import { useState } from "react";
import { Button } from "@/components/ui/Button";
import type { Job } from "@/utils/jobsData.ts";
import styles from "./styles.module.css";

export function JobCard({
	job,
	onApply,
}: {
	job: Job;
	onApply?: (status: boolean) => void;
}) {
	const [apply, setApply] = useState(false);

	function handleClick() {
		setApply(!apply);
		onApply?.(apply);
	}

	return (
		<article className={styles.root}>
			<header>
				<div>
					<h2>{job.title}</h2>
					<p>
						{job.company} | {job.location}
					</p>
				</div>

				<Button
					disabled={apply}
					variant={apply ? "success" : "primary"}
					onClick={handleClick}
				>
					{apply ? "Aplicado" : "Aplicar"}
				</Button>
			</header>

			<p>{job.description}</p>

			<footer className={styles.tags}>
				{job.tags.map((tag) => (
					<span key={tag}>{tag}</span>
				))}
			</footer>
		</article>
	);
}
