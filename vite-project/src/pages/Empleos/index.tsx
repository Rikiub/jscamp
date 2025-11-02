import { useMemo, useState } from "react";
import { JobList } from "@/components/shared/JobList";
import { Pagination } from "@/components/shared/Pagination";
import { SearchBar } from "@/components/shared/SearchBar";
import { FormLabel } from "@/components/ui/FormLabel";
import { Select } from "@/components/ui/Select";
import { getJobs } from "@/utils/jobsData";
import styles from "./styles.module.css";

function fuzzyFilter(source: string[], target: string) {
	for (const s of source) {
		if (sanitizeString(s).includes(sanitizeString(target))) return true;
	}
	return false;
}

function sanitizeString(str: string) {
	return str.toLowerCase().normalize("NFD").replace("/[\u0300-\u036f]/g", "");
}

function splitArray<T>(array: T[], size: number): T[][] {
	const result: T[][] = [];

	for (let i = 0; i < array.length; i += size) {
		result.push(array.slice(i, i + size));
	}

	return result;
}

export function EmpleosPage() {
	const [search, setSearch] = useState("");
	const [technology, setTechnology] = useState("");
	const [location, setLocation] = useState("");

	const [page, setPage] = useState(1);

	const jobs = getJobs();
	const jobsPages = useMemo(() => splitArray(jobs, 2), [jobs]);
	const jobsFiltered = useMemo(() => {
		let data = jobsPages[page - 1];

		if (search) {
			data = data.filter((j) => fuzzyFilter([j.title, j.description], search));
		}
		if (technology) {
			data = data.filter((j) => fuzzyFilter(j.tags, technology));
		}
		if (location) {
			data = data.filter((j) => fuzzyFilter([j.location], location));
		}

		return data;
	}, [technology, location, search, jobsPages[page], page]);

	const tags = useMemo(() => {
		const data: string[] = [];

		for (const j of jobs) {
			for (const t of j.tags) {
				if (data.includes(t)) break;
				data.push(t);
			}
		}

		return data;
	}, [jobs]);
	const locations = useMemo(() => {
		const data: string[] = [];

		for (const j of jobs) {
			if (data.includes(j.location)) break;
			data.push(j.location);
		}

		return data;
	}, [jobs]);

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
						value={search}
						onChange={(event) => setSearch(event.target.value)}
					/>

					<div className={styles.filters}>
						<FormLabel>
							Tecnologia
							<Select
								name="technology"
								placeholder="Seleciona..."
								value={technology}
								onChange={(event) => setTechnology(event.target.value)}
							>
								{tags.map((value) => (
									<option key={value}>{value}</option>
								))}
							</Select>
						</FormLabel>

						<FormLabel>
							Ubicación
							<Select
								name="location"
								placeholder="Seleciona..."
								value={location}
								onChange={(event) => setLocation(event.target.value)}
							>
								{locations.map((value) => (
									<option key={value}>{value}</option>
								))}
							</Select>
						</FormLabel>
					</div>
				</form>
			</section>

			<section>
				<main>
					<h2>Resultados de busqueda</h2>

					<JobList jobs={jobsFiltered} />

					<Pagination
						current={page}
						total={jobsPages.length}
						onChange={(number) => setPage(number)}
					/>
				</main>
			</section>
		</div>
	);
}
