import { Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import type { Job } from "@/features/jobs/types";
import { useAuth } from "@/store/authStore";
import { useFavoritesStore } from "../../store/favorites";
import styles from "./styles.module.css";

function Actions({ job }: { job: Job }) {
	const { isLoggedIn } = useAuth();
	const fav = useFavoritesStore();

	return (
		<div className={styles.actions}>
			{isLoggedIn && (
				<Button variant="ghost" onClick={() => fav.toggle(job.id)}>
					<Star fill={fav.isFavorite(job.id) ? "yellow" : "transparent"} />
				</Button>
			)}

			<Link to={`/empleos/${job.id}`}>
				<Button variant="primary">Detalles</Button>
			</Link>
		</div>
	);
}

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

				<Actions job={job} />
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
