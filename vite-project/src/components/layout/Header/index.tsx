import { Code } from "lucide-react";
import { Link } from "react-router";
import styles from "./styles.module.css";

export function Header() {
	return (
		<header className={styles.root}>
			<div className={styles.logo}>
				<Code size={30} />
				<p>DevJobs</p>
			</div>

			<nav className={styles.nav}>
				<Link to={{ pathname: "/" }} viewTransition>
					Inicio
				</Link>

				<Link to={{ pathname: "/empleos" }} viewTransition>
					Empleos
				</Link>

				<Link to={{ pathname: "/empresas" }} viewTransition>
					Empresas
				</Link>

				<Link to={{ pathname: "/salarios" }} viewTransition>
					Salarios
				</Link>
			</nav>

			<div className={styles.action}>
				<a href="#top">Publicar empleo</a>
			</div>
		</header>
	);
}
