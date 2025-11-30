import { type LucideIcon, Quote } from "lucide-react";
import type { InputHTMLAttributes } from "react";
import styles from "./styles.module.css";

export type InputProps = {
	className?: string;
	Icon?: LucideIcon;
} & InputHTMLAttributes<HTMLInputElement>;

export function Input({ className = "", Icon = Quote, ...props }: InputProps) {
	return (
		<div className={`${styles.root} ${className}`}>
			<div className={styles.icon}>
				<Icon />
			</div>

			<input type="text" {...props}></input>
		</div>
	);
}
