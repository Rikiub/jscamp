import { createBrowserRouter } from "react-router";
import { NotFound } from "@/pages/404";
import { MainLayout } from "./layout/MainLayout";

export const router = createBrowserRouter([
	{
		Component: MainLayout,
		ErrorBoundary: NotFound,
		children: [
			{
				path: "/",
				lazy: async () => {
					const mod = await import("@/pages/index");
					return { Component: mod.Index };
				},
			},
			{
				path: "/empleos",
				lazy: async () => {
					const mod = await import("@/pages/empleos");
					return { Component: mod.Empleos };
				},
			},
			{
				path: "/empleos/:id",
				lazy: async () => {
					const comp = await import("@/pages/detalles");
					const func = await import("@/features/jobs/useJobs");

					const loader = async ({
						params,
					}: {
						params: Record<string, string | undefined>;
					}) => func.getJob(params.id ?? "");

					return { Component: comp.JobDetails, loader };
				},
			},
			{ path: "*", Component: NotFound },
		],
	},
]);
