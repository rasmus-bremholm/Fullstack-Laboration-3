"use client";
import Link from "next/link";
import styles from "../page.module.css";
import { useAuth } from "../utils/authcontext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LoginIcon, LogoutIcon } from "../icons/icons";
import { ToastContainer, toast } from "react-toastify";

export default function LoginButton() {
	const { isLoggedIn, logout } = useAuth();
	const router = useRouter();
	// Måste göra detta för att hydration inte funkar...suck.
	const [hasMounted, setHasMounted] = useState(false);
	const logoutToast = () => toast("Logged out!");

	useEffect(() => {
		setHasMounted(true);
	}, []);

	const logoutUser = () => {
		if (isLoggedIn) {
			logout();
			logoutToast();
			router.push("/");
		} else {
			console.log("Hur kom du ens hit? Vi kan inte logga ut dig?");
		}
	};

	if (!hasMounted) return null;

	return isLoggedIn ? (
		<>
			<LogoutIcon onClick={logoutUser} className={styles.icons} />
			<ToastContainer position='top-right' autoClose={5000} />
		</>
	) : (
		<Link href={"/login"}>
			<LoginIcon className={styles.icons} />
		</Link>
	);
}
