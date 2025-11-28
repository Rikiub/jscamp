import { Button } from "@/components/ui/Button";
import { FavoriteIcon } from "@/components/ui/FavoriteIcon";
import { Link } from "@/components/ui/Link";
import type { Job } from "@/features/jobs/types";
import { useAuthStore } from "@/store/authStore";
import { useFavoritesStore } from "../../store/favorites";
import styles from "./styles.module.css";

function Actions({ job }: { job: Job }) {
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
