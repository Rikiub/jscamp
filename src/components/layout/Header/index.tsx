import { Code } from "lucide-react";
import { NavLink, type NavLinkProps } from "react-router";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/store/authStore";
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
	const { isLoggedIn, login, logout } = useAuth();

	return (
		<header className={styles.root}>
			<div>
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
			</div>

			<div>
				<Button
					variant={isLoggedIn ? "secondary" : "primary"}
					onClick={() => (isLoggedIn ? logout() : login())}
				>
					{isLoggedIn ? "Cerrar sesión" : "Iniciar sesión"}
				</Button>
			</div>
		</header>
	);
}
