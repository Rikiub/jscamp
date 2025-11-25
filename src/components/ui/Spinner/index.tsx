import { Loader2 } from "lucide-react";
import styles from "./styles.module.css";

export function Spinner({
	loading = false,
	size = 24,
}: {
	loading?: boolean;
	size?: number;
}) {
	return (
		<Loader2
			size={size}
			className={`${styles.root} ${loading ? styles.loading : ""}`}
		/>
	);
}
