import { Outlet } from "react-router";
import { Footer } from "./Footer";
import { Header } from "./Header";

export function StandardLayout() {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
}
