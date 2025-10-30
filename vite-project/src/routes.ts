import { createBrowserRouter } from "react-router";
import { StandardLayout } from "@/components/layout/StandardLayout";
import { EmpleosPage } from "@/pages/Empleos";
import { LandingPage } from "@/pages/Landing";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: StandardLayout,
        children: [
            { index: true, Component: LandingPage },
            {
                path: "/empleos",
                Component: EmpleosPage,
            },
        ],
    },
]);
