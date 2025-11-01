import { createBrowserRouter } from "react-router";
import { StandardLayout } from "@/components/layout/StandardLayout";
import { EmpleosPage } from "@/pages/Empleos";
import { LandingPage } from "@/pages/Landing";

export const router = createBrowserRouter([
    {
        Component: StandardLayout,
        children: [
            { path: "/", Component: LandingPage },
            { path: "/empleos", Component: EmpleosPage },
        ],
    },
]);
