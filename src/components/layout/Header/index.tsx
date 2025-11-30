import { Code } from "lucide-react";
import { NavLink, useNavigate, type NavLinkProps } from "react-router";
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/store/authStore";
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
	const navigate = useNavigate();
	const { isLoggedIn, logout } = useAuthStore();

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
					onClick={() =>
						isLoggedIn ? logout() : navigate("/login", { viewTransition: true })
					}
				>
					{isLoggedIn ? "Cerrar sesión" : "Iniciar sesión"}
				</Button>
			</div>
		</header>
	);
}
