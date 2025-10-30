import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WelcomePage } from "@/pages/Welcome";

import "@/styles/base.css";
import "@/styles/theme.css";

function App() {
	return (
		<>
			<Header />
			<WelcomePage />
			<Footer />
		</>
	);
}

export default App;
