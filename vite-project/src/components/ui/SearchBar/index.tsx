import { Search } from "lucide-react";
import { type InputHTMLAttributes, useEffect, useState } from "react";
import styles from "./styles.module.css";

type Props = {
	className?: string;
	defaultValue?: string;
	debounce?: number;
	onSearch?: (value: string) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export function SearchBar({
	className = "",
	defaultValue = "",
	debounce = 300,
	onSearch = () => {},
	...rest
}: Props) {
	const [input, setInput] = useState(defaultValue);

	useEffect(() => {
		const timeout = setTimeout(() => onSearch(input), debounce);
		return () => clearTimeout(timeout);
	}, [input, debounce, onSearch]);

	return (
		<search className={`${styles.root} ${className}`}>
			<Search />
			<input
				type="text"
				value={input}
				onChange={(e) => setInput(e.target.value)}
				{...rest}
			/>
		</search>
	);
}
