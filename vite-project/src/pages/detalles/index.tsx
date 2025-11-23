import Markdown from "react-markdown";
import { useLoaderData } from "react-router";
import { Button } from "@/components/ui/Button";
import type { FullJob } from "@/features/jobs/types";
import styles from "./styles.module.css";

function Section({ title, content }: { title: string; content: string }) {
	return (
		<section>
			<h2>{title}</h2>
			<Markdown>{content}</Markdown>
		</section>
	);
}

export function JobDetails() {
	const job = useLoaderData<FullJob>();

	return (
		<main className={styles.root}>
			<header>
				<div>
					<h1>{job.title}</h1>
					<p>
						{job.company} | {job.location}
					</p>
				</div>

				<Button variant="primary">Aplicar ahora</Button>
			</header>

			<Section
				title="Descripción del puesto"
				content={job.content.description}
			/>
			<Section
				title="Responsabilidades"
				content={job.content.responsibilities}
			/>
			<Section title="Requisitos" content={job.content.requirements} />
			<Section title="Acerca de la empresa" content={job.content.about} />
		</main>
	);
}
