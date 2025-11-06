import { Briefcase } from "lucide-react";
import { SearchBar } from "@/components/ui/SearchBar";
import Background from "./assets/background.webp";
import { AboutCard } from "./components/AboutCard";
import styles from "./styles.module.css";

export function Index() {
	return (
		<main className={styles.root}>
			<title>DevJobs</title>

			<section className={styles.hero}>
				<img className={styles.hero} src={Background} alt="Banner" />

				<h1>Encuentra el trabajo de tus sueños</h1>

				<p>
					Únete a la comunidad más grande de desarrolladores y encuentra tu
					próxima oportunidad.
				</p>

				<SearchBar placeholder="Buscar trabajos, empresas o habilidades" />
			</section>

			<section className={styles.about}>
				<header>
					<h2>¿Por qué DevJobs?</h2>
					<p>
						DevJobs es la principal plataforma de búsqueda de empleo para
						desarrolladores. Conectamos a los mejores talentos con las empresas
						más innovadoras.
					</p>
				</header>

				<footer className={styles.horizontal_grid}>
					<AboutCard
						Icon={Briefcase}
						title="Encuentra el trabajo de tus sueños"
						description="Busca miles de empleos de las mejores empresas de todo el mundo."
					/>

					<AboutCard
						Icon={Briefcase}
						title="Conecta con las mejores empresas"
						description="Conecta con empresas que están contratando por tus habilidades."
					/>

					<AboutCard
						Icon={Briefcase}
						title="Obtén el salario que mereces"
						description="Obtén el salario que mereces con nuestra calculadora de salarios."
					/>
				</footer>
			</section>
		</main>
	);
}
