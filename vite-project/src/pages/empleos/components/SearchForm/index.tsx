import { SearchBar } from "@/components/ui/SearchBar";
import { useId, useState, type FormEvent } from "react";
import styles from "./styles.module.css";
import { FormLabel } from "@/components/ui/FormLabel";
import { Select } from "@/components/ui/Select";
import { useTags } from "../../api/tags";
import type { Filters } from "../../api/useJobs";

export function SearchForm() {
	const [search, setSearch] = useState(localStorage.getItem("search") ?? "");
	const [technology, setTechnology] = useState(
		localStorage.getItem("technology") ?? "",
	);
	const [location, setLocation] = useState(
		localStorage.getItem("location") ?? "",
	);
	const [page, setPage] = useState(Number(localStorage.getItem("page") ?? 1));

	const [tags] = useTags();

	const searchId = useId();
	const technologyId = useId();
	const locationId = useId();

	function onSubmit(event: FormEvent<HTMLFormElement>): Filters {
		const target = event.currentTarget;
		const form = new FormData(target);
	}

	return (
		<form onSubmit={onSearch}>
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
						{tags?.technology.map((value) => (
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
						{tags?.location.map((value) => (
							<option key={value}>{value}</option>
						))}
					</Select>
				</FormLabel>
			</div>
		</form>
	);
}
