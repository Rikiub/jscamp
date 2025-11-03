import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./routes";

import "./styles/base.css";
import "./styles/theme.css";

// biome-ignore lint/style/noNonNullAssertion: <initializer>
createRoot(document.getElementById("root")!).render(
	<RouterProvider router={router} />,
);
