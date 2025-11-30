import { Code, LogOut, User } from "lucide-react";
import { NavLink, type NavLinkProps, useNavigate } from "react-router";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Dropdown } from "@/components/ui/Dropdown";
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

			<div className={styles.user}>
				{!isLoggedIn && (
					<Button
						variant="primary"
						onClick={() => navigate("/login", { viewTransition: true })}
					>
						Iniciar sesión
					</Button>
				)}

				{isLoggedIn && (
					<Dropdown
						items={[
							{ Icon: User, label: "Perfil", to: "/perfil" },
							{
								Icon: LogOut,
								label: "Cerrar sesión",
								onClick: () => {
									logout();
									navigate("/", { viewTransition: true });
								},
							},
						]}
					>
						<Avatar />
					</Dropdown>
				)}
			</div>
		</header>
	);
}
