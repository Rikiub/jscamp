import type React from "react";
import styles from "./styles.module.css";

type Props = {
	placeholder?: string | null;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select({
	value,
	className,
	children,
	placeholder,
	...rest
}: Props) {
	return (
		<select
			className={`${styles.root} ${className ?? ""} ${
				placeholder && !value ? styles.placeholder : ""
			}`}
			value={value}
			{...rest}
		>
			{placeholder && <option value="">{placeholder}</option>}
			{children}
		</select>
	);
}
