import type React from "react";
import styles from "./styles.module.css";

export function Select({
	className,
	children,
	...rest
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
	return (
		<select {...rest} className={`${styles.root} ${className}`}>
			{children}
		</select>
	);
}
