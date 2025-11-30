import type React from "react";
import styles from "./styles.module.css";

export type ButtonProps = {
	href?: string;
	variant?:
		| "primary"
		| "secondary"
		| "outline"
		| "success"
		| "destructive"
		| "ghost";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
	href,
	type = "button",
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
					type={type}
					className={` ${styles[variant]} ${styles.root} }`}
				>
					{children}
				</button>
			)}
		</div>
	);
}
