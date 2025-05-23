// Referensbild
//https://www.sliderrevolution.com/wp-content/uploads/2021/06/boot1.jpg
"use client";

import styles from "../styles/profile.module.css";
import type { user } from "../types/types";
import { useState, useEffect } from "react";

export default function Profile() {
	const [user, setUser] = useState<user>({
		id: 0,
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		profile_picture: "",
	});

	useEffect(() => {
		async function getUserDetails() {
			const token = localStorage.getItem("token");

			const response = await fetch("https://fullstack-laboration-3.onrender.com/api/user", {
				method: "GET",
				headers: { Authorization: `Bearer ${token}` },
			});
			const data: user = await response.json();
			if (response.ok) {
				setUser(data);
			}
		}
		getUserDetails();
	}, []);

	return (
		<div className={styles.profilecontainer}>
			<div className={styles.avatarcontainer}>{user.first_name}</div>
			<div className={styles.infocontainer}>info</div>
			<div className={styles.groupcontainer}>groups</div>
			<div className={styles.eventscontainer}>event</div>
		</div>
	);
}
