import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface AuthStoreType {
	isLoggedIn: boolean;

	login: () => void;
	logout: () => void;
}

export const useAuth = create<AuthStoreType>()(
	persist(
		(set) => ({
			isLoggedIn: false,

			login: () => set({ isLoggedIn: true }),
			logout: () => set({ isLoggedIn: false }),
		}),
		{ name: "user" },
	),
);
