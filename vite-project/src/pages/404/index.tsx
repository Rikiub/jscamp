import { Link2Off } from "lucide-react";
import { Link } from "react-router";
import { Button } from "@/components/ui/Button";
import styles from "./styles.module.css";

export function NotFound() {
	return (
		<div className={styles.root}>
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
		</div>
	);
}
