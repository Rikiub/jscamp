import type { ReactNode } from "react";
import styles from "./styles.module.css";

export function Card({
	className,
	children,
}: {
	className?: string;
	children?: ReactNode;
}) {
	return <div className={`${styles.root} ${className}`}>{children}</div>;
}
