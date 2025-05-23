"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/types";

interface ContextType {
	isLoggedIn: boolean;
	userId: number | null;
	logout: () => void;
}

const AuthContext = createContext<ContextType>({
	isLoggedIn: false,
	userId: null,
	logout: () => {},
});

export function useAuth() {
	return useContext(AuthContext);
}

// Providern är alltid svår.

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userId, setUserID] = useState<number | null>(null);

	const logout = () => {
		localStorage.removeItem("token");
		setIsLoggedIn(false);
		setUserID(null);
	};

	// När Auth providern körs, så körs automagiskt denna funktionen som en vanlig useEffect, najs!
	useEffect(() => {
		const token = localStorage.getItem("token");
		async function checkAuth() {
			const respons = await fetch("https://fullstack-laboration-3.onrender.com/api/user", {
				headers: { Authorization: `Bearer ${token}` },
			});

			if (respons.ok) {
				const data: User = await respons.json();
				setIsLoggedIn(true);
				setUserID(data.id);
			}
		}
		checkAuth();
	}, []);

	return <AuthContext.Provider value={{ isLoggedIn, userId, logout }}>{children}</AuthContext.Provider>;
}
