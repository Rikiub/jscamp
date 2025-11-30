import { Lock, Mail } from "lucide-react";
import { type FormEvent, useId } from "react";
import { Navigate, useNavigate } from "react-router";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { Link } from "@/components/ui/Link";
import { useAuthStore } from "@/store/authStore";
import styles from "./styles.module.css";

export default function Login() {
	const { isLoggedIn, login } = useAuthStore();
	const navigate = useNavigate();
	const redirectTo = "/";

	const idForm = useId();
	const idUsername = useId();
	const idPassword = useId();

	if (isLoggedIn) {
		return <Navigate to={redirectTo} />;
	}

	function handleSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		const fd = new FormData(event.currentTarget);
		const user = fd.get(idUsername) ?? "";
		const pass = fd.get(idPassword) ?? "";

		login(user.toString(), pass.toString());
		navigate(redirectTo, { viewTransition: true });
	}

	return (
		<main className={styles.root}>
			<header>
				<h1>Bienvenido de vuelta</h1>
				<p>Inicia sesión para encontrar tu siguiente oportunidad</p>
			</header>

			<Card className={styles.card}>
				<form
					id={idForm}
					style={{ display: "contents" }}
					onSubmit={handleSubmit}
				>
					<Input Icon={Mail} id={idUsername} placeholder="Email" />
					<Input Icon={Lock} id={idPassword} placeholder="Contraseña" />
				</form>

				<div className={styles.password}>
					<div className={styles.remember}>
						<Checkbox />
						<span>Recordar</span>
					</div>

					<Link to="/perfil" className={styles.forget}>
						¿Olvidastes tu contraseña?
					</Link>
				</div>

				<Button variant="primary" type="submit" form={idForm}>
					Iniciar sesión
				</Button>

				<hr />

				<p className={styles.separator}>¿No tienes una cuenta?</p>

				<Button variant="outline">Registrarse</Button>
			</Card>
		</main>
	);
}
