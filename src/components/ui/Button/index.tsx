import type React from "react";
import styles from "./styles.module.css";

type Props = {
	href?: string;
	variant?: "primary" | "secondary" | "success" | "destructive" | "ghost";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
	href,
	variant = "secondary",
	children,
	...rest
}: Props) {
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
