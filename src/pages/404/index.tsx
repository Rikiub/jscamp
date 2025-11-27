import { Link2Off } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";
import styles from "./styles.module.css";

export default function NotFound() {
	return (
		<main className={styles.root}>
			<title>Error</title>

			<header>
				<Link2Off />

				<h1>404</h1>
				<h2>Pagina no encontrada</h2>

				<p>¡Oops! Pagina equivocada.</p>
			</header>

			<Link to="/">
				<Button>Volver al inicio</Button>
			</Link>
		</main>
	);
}
