import type { LucideIcon } from "lucide-react";
import styles from "./styles.module.css";

export function AboutCard({
	Icon,
	title,
	description,
}: {
	Icon: LucideIcon;
	title: string;
	description: string;
}) {
	return (
		<article className={styles.root}>
			<Icon />
			<h3>{title}</h3>
			<p>{description}</p>
		</article>
	);
}
