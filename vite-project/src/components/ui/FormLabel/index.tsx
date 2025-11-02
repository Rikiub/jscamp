/** biome-ignore-all lint/a11y/noLabelWithoutControl: component builtin */
import type React from "react";
import styles from "./styles.module.css";

export function FormLabel({
	className,
	children,
	...rest
}: React.LabelHTMLAttributes<HTMLLabelElement>) {
	return (
		<label className={`${styles.root} ${className}`} {...rest}>
			{children}
		</label>
	);
}
