import { Outlet } from "react-router";
import { Footer } from "../Footer";
import { Header } from "../Header";
import styles from "./styles.module.css";

export function StandardLayout() {
	return (
		<>
			<Header />

			<div className={styles.root}>
				<Outlet />
			</div>

			<Footer />
		</>
	);
}
