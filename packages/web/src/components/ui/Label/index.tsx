import type { LabelHTMLAttributes } from "react";
import styles from "./styles.module.css";

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export function Label({ children }: LabelProps) {
	// biome-ignore lint/a11y/noLabelWithoutControl: <custom implementation>
	return <label className={styles.root}>{children}</label>;
}
