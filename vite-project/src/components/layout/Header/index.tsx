import { Code } from "lucide-react";
import styles from "./styles.module.css";

export function Header() {
	return (
		<header className={styles.root}>
			<div className={styles.left_logo}>
				<Code size={30} />
				<p>DevJobs</p>
			</div>

			<nav className={styles.center_nav}>
				<a href="#top">Inicio</a>
				<a href="#top">Empleos</a>
				<a href="#top">Empresas</a>
				<a href="#top">Salarios</a>
			</nav>

			<div className={styles.right_action}>
				<a href="#top">Publicar empleo</a>
			</div>
		</header>
	);
}
