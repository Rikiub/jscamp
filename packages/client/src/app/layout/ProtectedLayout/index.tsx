import type { ReactNode } from "react";
import { Navigate } from "react-router";
import { useAuthStore } from "@/store/authStore";

export function ProtectedLayout({
	redirectTo,
	children,
}: {
	redirectTo: string;
	children: ReactNode;
}) {
	const { isLoggedIn } = useAuthStore();

	if (!isLoggedIn) {
		return <Navigate to={redirectTo} />;
	} else {
		return <>{children}</>;
	}
}
