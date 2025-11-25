import { Search } from "lucide-react";
import { type InputHTMLAttributes, useEffect, useState } from "react";
import styles from "./styles.module.css";

type Props = {
	defaultValue?: string;
	debounce?: number;
	className?: string;
	onSearch?: (value: string) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export function SearchBar({
	defaultValue = "",
	debounce = 300,
	className = "",
	onSearch = () => {},
	...rest
}: Props) {
	const [input, setInput] = useState(defaultValue);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <onSearch is not neccesary / memory leak>
	useEffect(() => {
		const timeout = setTimeout(() => onSearch(input), debounce);
		return () => clearTimeout(timeout);
	}, [input, debounce]);

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
