"use client";
import Link from "next/link";
import styles from "../page.module.css";
import { useAuth } from "../utils/authcontext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginButton() {
	const { isLoggedIn, logout } = useAuth();
	const router = useRouter();
	// Måste göra detta för att hydration inte funkar...suck.
	const [hasMounted, setHasMounted] = useState(false);

	useEffect(() => {
		setHasMounted(true);
	}, []);

	const logoutUser = () => {
		if (isLoggedIn) {
			logout();
			router.push("/");
		} else {
			console.log("Hur kom du ens hit? Vi kan inte logga ut dig?");
		}
	};

	if (!hasMounted) return null;

	return isLoggedIn ? (
		<span onClick={logoutUser} className={`material-symbols-outlined ${styles.icons}`}>
			logout
		</span>
	) : (
		<Link href={"/login"}>
			<span className={`material-symbols-outlined ${styles.icons}`}>login</span>
		</Link>
	);
}
