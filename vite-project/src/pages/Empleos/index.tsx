import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { JobList } from "@/components/shared/JobList";
import { Pagination } from "@/components/shared/Pagination";
import { SearchBar } from "@/components/shared/SearchBar";
import { FormLabel } from "@/components/ui/FormLabel";
import { Select } from "@/components/ui/Select";
import { getJobs, getLocations, getTags } from "@/lib/jobsData";
import { fuzzyFilter } from "@/lib/sanitize";
import styles from "./styles.module.css";

export function EmpleosPage() {
	const RESULTS_PER_PAGE = 10;

	const [search, setSearch] = useState("");
	const [technology, setTechnology] = useState("");
	const [location, setLocation] = useState("");

	const [searchParams, setSearchParams] = useSearchParams();
	const [page, setPage] = useState(Number(searchParams.get("page") ?? 1));
	useEffect(() => {
		setSearchParams({ page: page.toString() });
	}, [page, setSearchParams]);

	const jobs = getJobs();
	const jobsFiltered = useMemo(() => {
		let data = jobs;

		if (search) {
			data = data.filter((j) => fuzzyFilter([j.title, j.description], search));
		}
		if (technology) {
			data = data.filter((j) => fuzzyFilter(j.tags, technology));
		}
		if (location) {
			data = data.filter((j) => fuzzyFilter([j.location], location));
		}

		data = data.slice((page - 1) * RESULTS_PER_PAGE, page * RESULTS_PER_PAGE);

		return data;
	}, [technology, location, search, page, jobs]);
	const totalPages = Math.ceil(jobs.length / RESULTS_PER_PAGE);

	const locations = useMemo(() => getLocations(jobs), [jobs]);
	const tags = useMemo(() => getTags(jobs), [jobs]);
	console.log(tags);

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
						total={totalPages}
						onChange={(number) => setPage(number)}
					/>
				</main>
			</section>
		</div>
	);
}
