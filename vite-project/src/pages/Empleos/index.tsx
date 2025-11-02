import { useEffect, useMemo, useState } from "react";
import { JobList } from "@/components/shared/JobList";
import { Pagination } from "@/components/shared/Pagination";
import { SearchBar } from "@/components/shared/SearchBar";
import { Select } from "@/components/ui/Select";
import { getJobs } from "@/utils/jobsData";
import styles from "./styles.module.css";
import { FormLabel } from "@/components/ui/FormLabel";

export function EmpleosPage() {
	const [page, setPage] = useState(1);
	const jobs = useMemo(() => getJobs(), []);

	useEffect(() => {
		document.title = "DevJobs - Empleos";
		console.log("Current page:", page);
	}, [page]);

	return (
		<div className={styles.root}>
			<section>
				<header>
					<h1>Encuentra tu próximo trabajo</h1>
					<p>Explora miles de oportunidades en el sector tecnologico.</p>
				</header>

				<form onSubmit={(e) => e.preventDefault()}>
					<SearchBar
						name="search"
						placeholder="Buscar trabajos, empresas o habilidades"
					/>

					<div className={styles.filters}>
						<FormLabel>
							Tecnologia
							<Select name="technology" placeholder="Seleciona...">
								<option value="mobile">Mobile</option>
								<option value="javascript">JavaScript</option>
								<option value="python">Python</option>
								<option value="java">Java</option>
								<option value="react">React</option>
								<option value="nodejs">Node.js</option>
							</Select>
						</FormLabel>

						<FormLabel>
							Ubicación
							<Select name="location" placeholder="Seleciona...">
								<option value="remoto">Remoto</option>
								<option value="cdmx">Ciudad de México</option>
								<option value="guadalajara">Guadalajara</option>
								<option value="monterrey">Monterrey</option>
								<option value="barcelona">Barcelona</option>
							</Select>
						</FormLabel>
					</div>
				</form>
			</section>

			<section>
				<main>
					<h2>Resultados de busqueda</h2>

					<JobList jobs={jobs} />

					<Pagination
						current={page}
						total={5}
						onChange={(number) => setPage(number)}
					/>
				</main>
			</section>
		</div>
	);
}
