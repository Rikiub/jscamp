import { createBrowserRouter } from "react-router";
import { getJob } from "@/features/jobs/useJobs";
import { NotFound } from "@/pages/404";
import { JobDetails } from "@/pages/detalles";
import { Empleos } from "@/pages/empleos";
import { Index } from "@/pages/index";
import { MainLayout } from "./layout/MainLayout";

export const router = createBrowserRouter([
    {
        Component: MainLayout,
        children: [
            { path: "/", Component: Index },
            { path: "/empleos", Component: Empleos },
            {
                path: "/empleos/:id",
                Component: JobDetails,
                loader: async ({ params }) => getJob(params.id ?? ""),
            },
            { path: "*", Component: NotFound },
        ],
    },
]);
