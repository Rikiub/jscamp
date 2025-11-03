import { createBrowserRouter } from "react-router";
import { Empleos } from "@/pages/empleos";
import { Index } from "@/pages/index";
import { MainLayout } from "./layout/MainLayout";

export const router = createBrowserRouter([
    {
        Component: MainLayout,
        children: [
            { path: "/", Component: Index },
            { path: "/empleos", Component: Empleos },
        ],
    },
]);
