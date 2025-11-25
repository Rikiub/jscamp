import { Code } from "lucide-react";
import { NavLink, type NavLinkProps } from "react-router";
import styles from "./styles.module.css";

function Link({ className, children, ...rest }: NavLinkProps) {
	return (
		<NavLink
			viewTransition
			className={({ isActive }: { isActive: boolean }) =>
				isActive ? styles.active : ""
			}
			{...rest}
		>
			{children}
		</NavLink>
	);
}

export function Header() {
	return (
		<header className={styles.root}>
			<Link to="/">
				<div className={styles.logo}>
					<Code size={30} />
					<p>DevJobs</p>
				</div>
			</Link>

			<nav className={styles.nav}>
				<Link to={{ pathname: "/empleos" }}>Empleos</Link>
				<Link to={{ pathname: "/empresas" }}>Empresas</Link>
				<Link to={{ pathname: "/salarios" }}>Salarios</Link>
			</nav>
		</header>
	);
}
