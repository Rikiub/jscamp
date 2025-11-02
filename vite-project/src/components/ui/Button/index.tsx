import type React from "react";
import styles from "./styles.module.css";

type Props = {
	variant: "primary" | "secondary" | "success" | "destructive";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({ variant = "secondary", children, ...rest }: Props) {
	return (
		<button
			{...rest}
			type="button"
			className={`${styles.root} ${styles[variant]}`}
		>
			{children}
		</button>
	);
}
