import type { LucideIcon } from "lucide-react";
import {
	type ReactNode,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from "react";
import { Button } from "../Button";
import styles from "./styles.module.css";

export interface DropdownItem {
	label: string;
	Icon?: LucideIcon;
	to?: string;
	onClick?: () => void;
}

export interface DropdownProps {
	items: DropdownItem[];
	children?: ReactNode;
	className?: string;
}

export function Dropdown({ children, items, className }: DropdownProps) {
	const [open, setOpen] = useState(false);
	const [alignRight, setAlignRight] = useState(false);

	const rootRef = useRef<HTMLDivElement | null>(null);
	const triggerRef = useRef<HTMLButtonElement | null>(null);
	const menuRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		function handleOutside(e: MouseEvent) {
			if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
				setOpen(false);
			}
		}

		function handleKey(e: KeyboardEvent) {
			if (e.key === "Escape") setOpen(false);
		}

		document.addEventListener("mousedown", handleOutside);
		document.addEventListener("keydown", handleKey);

		return () => {
			document.removeEventListener("mousedown", handleOutside);
			document.removeEventListener("keydown", handleKey);
		};
	}, []);

	// Measure and flip when opening to avoid right overflow
	useLayoutEffect(() => {
		if (!open) return;

		const trig = triggerRef.current?.getBoundingClientRect();
		const menuEl = menuRef.current;
		if (!trig || !menuEl) return;

		const menuWidth = menuEl.offsetWidth;
		const viewportWidth = window.innerWidth;
		const margin = 8;

		// if menu would overflow to the right, align to the right edge of the trigger
		const wouldOverflowRight = trig.left + menuWidth > viewportWidth - margin;
		setAlignRight(wouldOverflowRight);
	}, [open]);

	return (
		<div className={`${styles.root} ${className ?? ""}`} ref={rootRef}>
			<button
				ref={triggerRef}
				type="button"
				onClick={() => setOpen((v) => !v)}
				aria-haspopup="true"
				aria-controls="dropdown-menu"
				aria-expanded={open}
			>
				{children}
			</button>

			{open && (
				<div
					id="dropdown-menu"
					ref={menuRef}
					className={`${styles.menu} ${alignRight ? styles.menuRight : ""}`}
					role="menu"
				>
					{items.map((it) => (
						<li key={it.to} className={styles.item}>
							{it.Icon && <it.Icon size={15} />}
							<Button variant="ghost" to={it.to} onClick={it.onClick}>
								{it.label}
							</Button>
						</li>
					))}
				</div>
			)}
		</div>
	);
}
