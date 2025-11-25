import { useLoaderData } from "react-router";
import snarkdown from "snarkdown";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import type { FullJob } from "@/features/jobs/types";
import styles from "./styles.module.css";

function Section({ title, content }: { title: string; content: string }) {
	const html = snarkdown(content);

	return (
		<section>
			<h2>{title}</h2>

			{/** biome-ignore lint/security/noDangerouslySetInnerHtml: <simple markdown> */}
			<p dangerouslySetInnerHTML={{ __html: html }}></p>
		</section>
	);
}

export function JobDetails() {
	const job = useLoaderData<FullJob>();

	return (
		<main className={styles.root}>
			<Breadcrumb
				paths={[{ name: "Empleos", to: "/empleos" }, { name: job.title }]}
			/>

			<article>
				<title>{job.title}</title>

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
			</article>
		</main>
	);
}
