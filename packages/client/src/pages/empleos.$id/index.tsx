import { type LoaderFunctionArgs, useLoaderData } from "react-router";
import snarkdown from "snarkdown";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Button } from "@/components/ui/Button";
import { FavoriteIcon } from "@/components/ui/FavoriteIcon";
import type { FullJob } from "@/features/jobs/types";
import { getJob } from "@/features/jobs/useJobs";
import { useAuthStore } from "@/store/authStore";
import { useFavoritesStore } from "../empleos/store/favorites";
import styles from "./styles.module.css";

export async function loader({ params }: LoaderFunctionArgs) {
	return getJob(params.id ?? "");
}

function Actions({ job }: { job: FullJob }) {
	const { isLoggedIn } = useAuthStore();
	const fav = useFavoritesStore();

	return (
		<div className={styles.actions}>
			{isLoggedIn && (
				<FavoriteIcon
					onClick={() => fav.toggle(job.id)}
					fill={fav.isFavorite(job.id)}
				/>
			)}

			<Button
				disabled={!isLoggedIn}
				variant={isLoggedIn ? "primary" : "secondary"}
			>
				{isLoggedIn ? "Aplicar ahora" : "Iniciar sesión para aplicar"}
			</Button>
		</div>
	);
}

function Header({ job }: { job: FullJob }) {
	return (
		<header>
			<div>
				<h1>{job.title}</h1>
				<p>
					{job.company} | {job.location}
				</p>
			</div>

			<Actions job={job} />
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
