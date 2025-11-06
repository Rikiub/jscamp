import { useEffect, useId, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { FormLabel } from "@/components/ui/FormLabel";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import { Select } from "@/components/ui/Select";
import { JobList } from "./components/JobList";
import styles from "./styles.module.css";
import { getJobs, getLocations, getTags } from "./utils/jobs";
import { fuzzyFilter } from "./utils/sanitize";

export function Empleos() {
	const RESULTS_PER_PAGE = 10;
	const [searchParams, setSearchParams] = useSearchParams();

	// Filter Params
	const [search, setSearch] = useState(searchParams.get("search") ?? "");
	const [technology, setTechnology] = useState(
		searchParams.get("technology") ?? "",
	);
	const [location, setLocation] = useState(searchParams.get("location") ?? "");
	const [page, setPage] = useState(Number(searchParams.get("page") ?? 1));

	// Sync URL
	useEffect(() => {
		setSearchParams({
			page: page.toString(),
			search: search,
			technology: technology,
			location: location,
		});
	}, [setSearchParams, page, search, technology, location]);

	// Filtered
	const jobs = getJobs();
	const jobsFiltered = useMemo(() => {
		let data = jobs;

		if (technology) {
			data = data.filter((j) => fuzzyFilter(j.tags, technology));
		}
		if (location) {
			data = data.filter((j) => fuzzyFilter([j.location], location));
		}
		if (search) {
			data = data.filter((j) =>
				fuzzyFilter(
					[j.title, j.company, j.description, j.location, j.salary, ...j.tags],
					search,
				),
			);
		}

		data = data.slice((page - 1) * RESULTS_PER_PAGE, page * RESULTS_PER_PAGE);
		return data;
	}, [technology, location, search, page, jobs]);
	const totalPages = Math.ceil(jobs.length / RESULTS_PER_PAGE);

	// Selects
	const locations = useMemo(() => getLocations(jobs), [jobs]);
	const tags = useMemo(() => getTags(jobs), [jobs]);

	// Form
	const searchId = useId();
	const technologyId = useId();
	const locationId = useId();

	return (
		<div className={styles.root}>
			<title>Empleos</title>

			<section>
				<header>
					<h1>Encuentra tu próximo trabajo</h1>
					<p>Explora miles de oportunidades en el sector tecnologico.</p>
				</header>

				<form onSubmit={(e) => e.preventDefault()}>
					<SearchBar
						name={searchId}
						placeholder="Buscar trabajos, empresas o habilidades"
						defaultValue={search}
						onSearch={(value) => setSearch(value)}
						debounce={300}
					/>

					<div className={styles.filters}>
						<FormLabel>
							Tecnologia
							<Select
								name={technologyId}
								value={technology}
								placeholder="Seleciona..."
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
								placeholder="Seleciona..."
								name={locationId}
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
