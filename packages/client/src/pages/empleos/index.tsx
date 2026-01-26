import type { JobsParams } from "@project/server/jobs";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { Button } from "@/components/ui/Button";
import { Pagination } from "@/components/ui/Pagination";
import { SearchInput } from "@/components/ui/SearchInput";
import { Select } from "@/components/ui/Select";
import { useJobsAll } from "@/features/jobs/useJobs";
import { useTags } from "@/features/jobs/useTags";
import { JobList } from "./components/JobList";
import styles from "./styles.module.css";

type _Params = {
	page?: number;
} & JobsParams;
type SearchParams = Omit<_Params, "limit" | "offset">;

export default function Empleos() {
	const RESULTS_PER_PAGE = 5;
	const [searchParams, setSearchParams] = useSearchParams();

	const handleParamsChange = (newValues: SearchParams) => {
		setSearchParams((prev) => {
			const merged = { ...Object.fromEntries(prev), ...newValues };

			return Object.fromEntries(
				Object.entries(merged).filter(([_, v]) => v != null && v !== ""),
			) as Record<string, string>;
		});
	};

	// Filters
	const paramsFilters: SearchParams = {
		page: Number(searchParams.get("page") ?? 1),
		search: searchParams.get("search") ?? "",
		technology: searchParams.get("technology") ?? "",
		location: searchParams.get("location") ?? "",
	};
	const [requestFilters, setRequestFilters] = useState<JobsParams>();

	// Sync offset with page
	useEffect(() => {
		const page = paramsFilters.page || 1;

		setRequestFilters({
			limit: RESULTS_PER_PAGE,
			offset: (page - 1) * RESULTS_PER_PAGE,
		});
	}, [paramsFilters.page]);

	// Set initial page
	// biome-ignore lint/correctness/useExhaustiveDependencies: <unnecesary>
	useEffect(() => handleParamsChange({ page: paramsFilters.page }), []);

	// Is Filters Active?
	function resetFilters() {
		handleParamsChange({
			page: 1,
			search: "",
			technology: "",
			location: "",
		});
	}

	const filterActive = !!(
		paramsFilters.search ||
		paramsFilters.technology ||
		paramsFilters.location ||
		paramsFilters.level
	);

	// Filtered Jobs
	const { jobs, loading } = useJobsAll({ ...paramsFilters, ...requestFilters });
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
					<SearchInput
						placeholder="Buscar trabajos, empresas o habilidades"
						defaultValue={paramsFilters.search}
						onSearch={(v) => handleParamsChange({ search: v })}
						debounce={300}
					/>

					<div className={styles.filters}>
						<Select
							placeholder="Tecnologia"
							value={paramsFilters.technology}
							onChange={(v) => handleParamsChange({ technology: v })}
						>
							{tags?.technology.map((value) => (
								<option key={value}>{value}</option>
							))}
						</Select>

						<Select
							placeholder="Ubicación"
							value={paramsFilters.location}
							onChange={(v) => handleParamsChange({ location: v })}
						>
							{tags?.location.map((value) => (
								<option key={value}>{value}</option>
							))}
						</Select>

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
						current={paramsFilters.page ?? 1}
						total={totalPages}
						onChange={(page) => handleParamsChange({ page: page })}
					/>
				</main>
			</section>
		</div>
	);
}
