import { Outlet } from "react-router";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import styles from "./styles.module.css";

export function MainLayout() {
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
