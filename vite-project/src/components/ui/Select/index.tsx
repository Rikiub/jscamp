import type React from "react";
import { useState } from "react";
import styles from "./styles.module.css";

type Props = {
	placeholder?: string | null;
	name?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, children, placeholder, ...rest }: Props) {
	const [selectValue, setSelectValue] = useState("");

	return (
		<select
			value={selectValue}
			className={`${styles.root} ${className} ${placeholder && !selectValue ? styles.placeholder : ""}`}
			onChange={(v) => setSelectValue(v.target.value)}
			{...rest}
		>
			{placeholder && <option value="">{placeholder}</option>}
			{children}
		</select>
	);
}
