import { Code } from "lucide-react";
import styles from "./styles.module.css";

export function Header() {
	return (
		<header className={styles.root}>
			<Logo />
			<Nav />
			<Action />
		</header>
	);
}

function Logo() {
	return (
		<div className={styles.logo}>
			<Code size={30} />
			<p>DevJobs</p>
		</div>
	);
}

function Nav() {
	return (
		<nav className={styles.nav}>
			<a href="/">Inicio</a>
			<a href="/empleos">Empleos</a>
			<a href="#top">Empresas</a>
			<a href="#top">Salarios</a>
		</nav>
	);
}

function Action() {
	return (
		<div className={styles.action}>
			<a href="#top">Publicar empleo</a>
		</div>
	);
}
