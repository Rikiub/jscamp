import { Search } from "lucide-react";
import styles from "./styles.module.css";

export function SearchBar({
	className,
	placeholder,
	name,
}: {
	className?: string;
	placeholder?: string;
	name?: string;
}) {
	return (
		<search className={`${styles.root} ${className}`}>
			<Search />
			<input type="text" name={name} placeholder={placeholder} />
		</search>
	);
}
