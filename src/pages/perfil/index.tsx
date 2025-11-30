import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import styles from "./styles.module.css";

export default function Perfil() {
	const fullName = "Laura G.";
	const rol = "Programadora";

	return (
		<main className={styles.root}>
			<title>Perfil</title>

			<div className={styles.sideBar}>
				<header>
					<Avatar />

					<div>
						<h1>{fullName}</h1>
						<p>{rol}</p>
					</div>
				</header>

				<nav>
					<Button>Inicio</Button>
					<Button>Mi perfil</Button>
					<Button>Mis candidaturas</Button>
					<Button>Ofertas guardadas</Button>
					<Button>Configuración</Button>
				</nav>
			</div>

			<div className={styles.content}>
				<header>
					<h1>Mi perfil</h1>
					<p>Actualiza tu información personal y profesional</p>
				</header>

				<section>
					<header>
						<h2>Información personal</h2>
					</header>

					<div>
						<Label>
							Nombre
							<Input />
						</Label>

						<Label>
							Correo electronico
							<Input />
						</Label>

						<Label>
							Ubicación
							<Input />
						</Label>
					</div>
				</section>

				<section>
					<header>
						<h2>Experiencia</h2>
					</header>

					<div>
						<Label>
							Carga
							<Input />
						</Label>

						<Label>
							Empresa
							<Input />
						</Label>

						<Label>
							Años de experiencia
							<Input />
						</Label>
					</div>
				</section>

				<section>
					<header>
						<h2>Habilidades</h2>
					</header>
				</section>

				<section>
					<header>
						<h2>CV</h2>
					</header>
				</section>
			</div>
		</main>
	);
}
