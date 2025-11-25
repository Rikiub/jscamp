import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./routes";

import "./styles/base.css";
import "./styles/theme.css";

const root = document.getElementById("root");
if (root) createRoot(root).render(<RouterProvider router={router} />);
