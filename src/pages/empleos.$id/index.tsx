import { type LoaderFunctionArgs, useLoaderData } from "react-router";
import snarkdown from "snarkdown";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/context/AuthContext";
import type { FullJob } from "@/features/jobs/types";
import { getJob } from "@/features/jobs/useJobs";
import styles from "./styles.module.css";

export async function loader({ params }: LoaderFunctionArgs) {
	return getJob(params.id ?? "");
}

function Header({ job }: { job: FullJob }) {
	const { isLoggedIn } = useAuth();

	return (
		<header>
			<div>
				<h1>{job.title}</h1>
				<p>
					{job.company} | {job.location}
				</p>
			</div>

			<Button
				disabled={!isLoggedIn}
				variant={isLoggedIn ? "primary" : "secondary"}
			>
				{isLoggedIn ? "Aplicar ahora" : "Iniciar sesión para aplicar"}
			</Button>
		</header>
	);
}

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

export default function Details() {
	const job = useLoaderData<FullJob>();

	return (
		<main className={styles.root}>
			<Breadcrumb
				paths={[{ name: "Empleos", to: "/empleos" }, { name: job.title }]}
			/>

			<article>
				<title>{job.title}</title>

				<Header job={job} />

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
