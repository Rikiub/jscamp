import Fallback from "./fallback.png";
import styles from "./styles.module.css";

export function Avatar({
	image = Fallback,
	size = 54,
}: {
	size?: number;
	image?: string;
}) {
	return (
		<div style={{ width: size, height: size }} className={styles.root}>
			<img src={image} alt="Avatar" />
		</div>
	);
}
