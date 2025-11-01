import { useEffect, useState } from "react";
import { JobList } from "@/components/shared/JobList";
import { Pagination } from "@/components/shared/Pagination";
import { getJobs } from "@/utils/jobsData";
import styles from "./styles.module.css";

export function EmpleosPage() {
	useEffect(() => {
		document.title = "DevJobs - Empleos";
	});

	let [page] = useState(1);
	const jobs = getJobs();

	return (
		<main className={styles.root}>
			<section>
				<header>
					<h1>Encuentra tu próximo trabajo</h1>
					<p>Explora miles de oportunidades en el sector tecnologico.</p>
				</header>

				<search>
					<form>
						<div>
							<input
								type="text"
								name="search"
								placeholder="Buscar trabajos, empresas o habilidades"
							/>
						</div>

						<div className="filters" id="filters">
							<select name="technology">
								<option value="">Tecnologia</option>
								<option value="mobile">Mobile</option>
								<option value="javascript">JavaScript</option>
								<option value="python">Python</option>
								<option value="java">Java</option>
								<option value="react">React</option>
								<option value="nodejs">Node.js</option>
							</select>

							<select name="modalidad">
								<option value="">Ubicación</option>
								<option value="remoto">Remoto</option>
								<option value="cdmx">Ciudad de México</option>
								<option value="guadalajara">Guadalajara</option>
								<option value="monterrey">Monterrey</option>
								<option value="barcelona">Barcelona</option>
							</select>

							<select name="nivel">
								<option value="">Nivel de experiencia</option>
								<option value="junior">Junior</option>
								<option value="mid-level">Mid-Level</option>
								<option value="senior">Senior</option>
							</select>
						</div>
					</form>
				</search>
			</section>

			<section>
				<h2>Resultados de busqueda</h2>

				<JobList jobs={jobs} />

				<Pagination
					current={page}
					total={10}
					onChange={(number) => {
						page = number;
						alert(page);
					}}
				/>
			</section>
		</main>
	);
}
