"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { user } from "../types/types";

interface ContextType {
	isLoggedIn: boolean;
	userId: number | null;
}

const AuthContext = createContext<ContextType>({
	isLoggedIn: false,
	userId: null,
});

export function useAuth() {
	return useContext(AuthContext);
}

// Providern är alltid svår.

export function AuthProvider({ children }: { children: React.ReactNode }) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userId, setUserID] = useState<number | null>(null);

	// När Auth providern körs, så körs automagiskt denna funktionen som en vanlig useEffect, najs!
	useEffect(() => {
		async function checkAuth() {
			const respons = await fetch("https://fullstack-laboration-3.onrender.com/api/user", {
				credentials: "include",
			});

			if (respons.ok) {
				const data: user = await respons.json();
				setIsLoggedIn(true);
				setUserID(data.id);
			}
		}
		checkAuth();
	}, []);

	return <AuthContext.Provider value={{ isLoggedIn, userId }}>{children}</AuthContext.Provider>;
}
