import type { InputHTMLAttributes } from "react";
import styles from "./styles.module.css";

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement>;

export function Checkbox({ ...props }: CheckboxProps) {
	return <input className={styles.root} type="checkbox" {...props} />;
}
