import { Code } from "lucide-react";
import { Link } from "@/components/ui/Link";
import styles from "./styles.module.css";

export function Header() {
	return (
		<header className={styles.root}>
			<Link to="/" className={styles.logo}>
				<Code size={30} />
				<p>DevJobs</p>
			</Link>

			<nav className={styles.nav}>
				<Link to={{ pathname: "/empleos" }}>Empleos</Link>
				<Link to={{ pathname: "/empresas" }}>Empresas</Link>
				<Link to={{ pathname: "/salarios" }}>Salarios</Link>
			</nav>
		</header>
	);
}
