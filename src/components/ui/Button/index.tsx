import type React from "react";
import { Link } from "../Link";
import styles from "./styles.module.css";

export type ButtonProps = {
	to?: string;
	variant?:
		| "primary"
		| "secondary"
		| "outline"
		| "success"
		| "destructive"
		| "ghost";
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
	to,
	type = "button",
	variant = "secondary",
	children,
	...rest
}: ButtonProps) {
	return (
		<div className={styles.parent}>
			{(to && (
				<Link
					className={` ${styles[variant]} ${styles.link} ${styles.root} }`}
					to={to}
				>
					{children}
				</Link>
			)) || (
				<button
					{...rest}
					type={type}
					className={` ${styles[variant]} ${styles.button} ${styles.root} }`}
				>
					{children}
				</button>
			)}
		</div>
	);
}
