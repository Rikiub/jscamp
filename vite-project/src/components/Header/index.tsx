import { Code } from "lucide-react";
import styles from "./index.module.css";

export function Header() {
	return (
		<header className={styles.root}>
			<div>
				<Code />
				<p>DevJobs</p>
			</div>

			<nav>
				<a href="#top">Inicio</a>
				<a href="#top">Empleos</a>
				<a href="#top">Empresas</a>
				<a href="#top">Salarios</a>
			</nav>

			<div>
				<a href="#top">Publicar empleo</a>
			</div>
		</header>
	);
}
