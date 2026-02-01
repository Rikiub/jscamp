import type React from "react";
import styles from "./styles.module.css";

type Props = {
	placeholder?: string | null;
	onChange?: (value: string) => void;
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "onChange">;

export function Select({
	value,
	className,
	children,
	placeholder,
	onChange,
	...rest
}: Props) {
	return (
		<select
			{...rest}
			value={value}
			onChange={(e) => onChange?.(e.target.value)}
			className={`
				${styles.root}
				${placeholder && !value ? styles.placeholder : ""}
				${className ?? ""}
			`}
		>
			{placeholder && (
				<option value="" disabled hidden>
					{placeholder}
				</option>
			)}
			{children}
		</select>
	);
}
