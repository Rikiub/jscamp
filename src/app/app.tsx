import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "@/app/routes";
import { AuthProvider } from "@/context/AuthContext";

import "./styles/base.css";
import "./styles/theme.css";

const root = document.getElementById("root");
if (root)
	createRoot(root).render(
		<AuthProvider>
			<RouterProvider router={router}></RouterProvider>
		</AuthProvider>,
	);
