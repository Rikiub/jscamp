import { createBrowserRouter } from "react-router";
import { MainLayout } from "./layout/MainLayout";
import { ProtectedLayout } from "./layout/ProtectedLayout";

export const router = createBrowserRouter([
	{
		Component: MainLayout,
		children: [
			{
				path: "/",
				lazy: async () => {
					const mod = await import("@/pages/index");
					return { Component: mod.default };
				},
			},
			{
				path: "/empleos",
				lazy: async () => {
					const mod = await import("@/pages/empleos");
					return { Component: mod.default };
				},
			},
			{
				path: "/empleos/:id",
				lazy: async () => {
					const mod = await import("@/pages/empleos.$id");
					return { Component: mod.default, loader: mod.loader };
				},
			},
			{
				path: "/login",
				lazy: async () => {
					const mod = await import("@/pages/login");
					return { Component: mod.default };
				},
			},
			{
				path: "/perfil",
				lazy: async () => {
					const Default = (await import("@/pages/perfil")).default;
					return {
						element: (
							<ProtectedLayout redirectTo="/login">
								<Default />
							</ProtectedLayout>
						),
					};
				},
			},
			{
				path: "*",
				lazy: async () => {
					const mod = await import("@/pages/404");
					return { Component: mod.default };
				},
			},
		],
	},
]);
