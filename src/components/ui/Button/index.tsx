import type React from "react";
import styles from "./styles.module.css";

export type ButtonProps = {
	href?: string;
	variant?: "primary" | "secondary" | "success" | "destructive" | "ghost";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
	href,
	variant = "secondary",
	children,
	...rest
}: ButtonProps) {
	return (
		<div>
			{(href && (
				<a className={` ${styles[variant]} ${styles.root} }`} href={href}>
					{children}
				</a>
			)) || (
				<button
					{...rest}
					type="button"
					className={` ${styles[variant]} ${styles.root} }`}
				>
					{children}
				</button>
			)}
		</div>
	);
}
