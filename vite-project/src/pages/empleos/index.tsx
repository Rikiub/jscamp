import { useEffect, useId, useMemo, useState } from "react";
import { FormLabel } from "@/components/ui/FormLabel";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import { Select } from "@/components/ui/Select";
import { useTags } from "./api/tags";
import { type Filters, useJobs } from "./api/useJobs";
import { JobList } from "./components/JobList";
import styles from "./styles.module.css";

export function Empleos() {
	const RESULTS_PER_PAGE = 10;

	// Filters
	const [page, _setPage] = useState(Number(localStorage.getItem("page") ?? 1));
	const [filters, setFilters] = useState<Filters>({
		...JSON.parse(localStorage.getItem("filters") ?? ""),
		limit: RESULTS_PER_PAGE,
	});

	function setSearch(value: string) {
		resetPage();
		setFilters({ ...filters, search: value });
	}
	function setTechnology(value: string) {
		resetPage();
		setFilters({ ...filters, technology: value });
	}
	function setLocation(value: string) {
		resetPage();
		setFilters({ ...filters, location: value });
	}
	function setPage(value: number) {
		_setPage(value);
		setFilters({ ...filters, offset: (value - 1) * RESULTS_PER_PAGE });
	}
	function resetPage() {
		setPage(1);
	}

	// Save State
	// biome-ignore lint/correctness/useExhaustiveDependencies: <filters>
	useEffect(() => {
		localStorage.setItem("filters", JSON.stringify(filters));
		localStorage.setItem("page", page.toString());
	}, [filters.search, filters.technology, filters.location, page]);

	// Filtered Jobs
	const { jobs, loading } = useJobs(filters);
	const [tags] = useTags();

	const totalPages = useMemo(() => {
		if (!jobs) return 0;
		return Math.ceil(jobs.total / RESULTS_PER_PAGE);
	}, [jobs]);

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
						name={useId()}
						placeholder="Buscar trabajos, empresas o habilidades"
						defaultValue={filters.search}
						onSearch={(v) => setSearch(v)}
						debounce={300}
					/>

					<div className={styles.filters}>
						<FormLabel>
							Tecnologia
							<Select
								name={useId()}
								value={filters.technology}
								placeholder="Seleciona..."
								onChange={(e) => setTechnology(e.target.value)}
							>
								{tags?.technology.map((value) => (
									<option key={value}>{value}</option>
								))}
							</Select>
						</FormLabel>

						<FormLabel>
							Ubicación
							<Select
								placeholder="Seleciona..."
								name={useId()}
								value={filters.location}
								onChange={(e) => setLocation(e.target.value)}
							>
								{tags?.location.map((value) => (
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

					<JobList jobs={jobs?.data} loading={loading} />

					<Pagination
						current={page}
						total={totalPages}
						onChange={(page) => setPage(page)}
					/>
				</main>
			</section>
		</div>
	);
}
