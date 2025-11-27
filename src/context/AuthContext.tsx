import {
	createContext,
	type ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";

export interface AuthContextType {
	isLoggedIn: boolean;
	login: () => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
	undefined,
);

export function AuthProvider({ children }: { children: ReactNode }) {
	const key = "userLogged";
	const [isLoggedIn, setLoggedIn] = useState(() =>
		Boolean(localStorage.getItem(key)),
	);
	useEffect(
		() => localStorage.setItem(key, isLoggedIn.toString()),
		[isLoggedIn],
	);

	const login = () => {
		setLoggedIn(true);
	};
	const logout = () => {
		setLoggedIn(false);
	};

	const value: AuthContextType = {
		isLoggedIn,
		login,
		logout,
	};

	return <AuthContext value={value}>{children}</AuthContext>;
}

export function useAuth() {
	const ctx = useContext(AuthContext);
	if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
	return ctx;
}
