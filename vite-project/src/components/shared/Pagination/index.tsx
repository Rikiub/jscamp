import { ChevronFirst, ChevronLast } from "lucide-react";
import styles from "./styles.module.css";

type PaginationProps = {
	current: number;
	total: number;
	onChange: (page: number) => void;
};

export function Pagination({ current, total, onChange }: PaginationProps) {
	if (!total || total <= 1) return null;

	function goto(page: number) {
		const p = Math.max(1, Math.min(total, page));
		if (p !== current) onChange(p);
	}

	return (
		<nav className={styles.root} aria-label="Pagination">
			<button
				type="button"
				className={styles.control}
				onClick={() => goto(current - 1)}
				disabled={current === 1}
				aria-label="Previous page"
			>
				<ChevronFirst />
			</button>

			<div className={styles.pages}>
				{Array.from({ length: total }, (_, i) => {
					const page = i + 1;
					return (
						<button
							key={page}
							type="button"
							className={`${page === current ? styles.active : ""}`}
							onClick={() => goto(page)}
							aria-current={page === current ? "page" : undefined}
							aria-label={`Go to page ${page}`}
						>
							{page}
						</button>
					);
				})}
			</div>

			<button
				type="button"
				className={styles.control}
				onClick={() => goto(current + 1)}
				disabled={current === total}
				aria-label="Next page"
			>
				<ChevronLast />
			</button>
		</nav>
	);
}
