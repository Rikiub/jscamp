import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { Pagination } from "@/components/ui/Pagination";
import { SearchBar } from "@/components/ui/SearchBar";
import { Select } from "@/components/ui/Select";
import { type Filters, useJobsAll } from "@/features/jobs/useJobs";
import { useTags } from "@/features/jobs/useTags";
import { JobList } from "./components/JobList";
import styles from "./styles.module.css";

interface UrlParams {
	page?: string;
	search?: string;
	technology?: string;
	location?: string;
}

export default function Empleos() {
	const RESULTS_PER_PAGE = 10;
	const [params, setSearchParams] = useSearchParams();

	// Filters
	const [filterActive, setFilterActive] = useState(false);
	const [filters, setFilters] = useState<Filters>({
		search: params.get("search") ?? "",
		technology: params.get("technology") ?? "",
		location: params.get("location") ?? "",
		limit: RESULTS_PER_PAGE,
	});

	const [page, _setPage] = useState(Number(params.get("page") ?? 1));
	function setPage(value: number) {
		_setPage(value);
		setFilters({ ...filters, offset: (value - 1) * RESULTS_PER_PAGE });
	}

	function setFilter<K extends keyof Filters>(key: K, value: Filters[K]) {
		setPage(1);
		setFilters((prev) => ({
			...prev,
			[key]: value,
		}));
		setFilterActive(true);
	}
	function resetFilters() {
		setPage(1);
		setFilters({
			search: "",
			technology: "",
			location: "",
			limit: RESULTS_PER_PAGE,
		});
		setFilterActive(false);
	}

	// Save State
	// biome-ignore lint/correctness/useExhaustiveDependencies: <unnecesary>
	useEffect(() => {
		const params: UrlParams = {
			page: page.toString(),
			search: filters.search ?? "",
			technology: filters.technology ?? "",
			location: filters.location ?? "",
		};
		setSearchParams({ ...params });
	}, [page, filters.search, filters.technology, filters.location]);

	// Filtered Jobs
	const { jobs, loading } = useJobsAll(filters);
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
						placeholder="Buscar trabajos, empresas o habilidades"
						defaultValue={filters.search}
						onSearch={(v) => setFilter("search", v)}
						debounce={300}
					/>

					<div className={styles.filters}>
						<Label>
							Tecnologia
							<Select
								placeholder="Seleciona..."
								value={filters.technology}
								onChange={(v) => setFilter("technology", v)}
							>
								{tags?.technology.map((value) => (
									<option key={value}>{value}</option>
								))}
							</Select>
						</Label>

						<Label>
							Ubicación
							<Select
								placeholder="Seleciona..."
								value={filters.location}
								onChange={(v) => setFilter("location", v)}
							>
								{tags?.location.map((value) => (
									<option key={value}>{value}</option>
								))}
							</Select>
						</Label>

						{filterActive && (
							<Button onClick={resetFilters} variant="secondary">
								Reset Filters
							</Button>
						)}
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
