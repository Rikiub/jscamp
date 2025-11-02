import { Search } from "lucide-react";
import type { InputHTMLAttributes } from "react";
import styles from "./styles.module.css";

type Props = {
	className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export function SearchBar({ className, ...rest }: Props) {
	return (
		<search className={`${styles.root} ${className}`}>
			<Search />
			<input type="text" {...rest} />
		</search>
	);
}
