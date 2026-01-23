import { Link } from "../Link";
import styles from "./styles.module.css";

interface Segment {
	name: string;
	to?: string;
}

export function Breadcrumb({ paths }: { paths: Segment[] }) {
	return (
		<nav className={styles.root}>
			{paths.map((p, index) => {
				return (
					<div
						className={`${styles.segment}
                            ${paths.length === 1 ? styles.first : ""}
                            ${paths.length === index + 1 ? styles.end : ""}
                        `}
						key={p.name}
					>
						{p.to && <Link to={p.to}>{p.name}</Link>}
						{!p.to && <p>{p.name}</p>}

						{paths.length !== index + 1 && (
							<span className={styles.slash}>/</span>
						)}
					</div>
				);
			})}
		</nav>
	);
}
