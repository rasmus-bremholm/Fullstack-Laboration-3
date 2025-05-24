// Referensbild
//https://www.sliderrevolution.com/wp-content/uploads/2021/06/boot1.jpg
"use client";

import styles from "../styles/profile.module.css";
import type { user } from "../types/types";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function Profile() {
	const [user, setUser] = useState<user>({
		id: 0,
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		profile_picture: null,
	});

	useEffect(() => {
		async function getUserDetails() {
			const token = localStorage.getItem("token");

			const response = await fetch("https://fullstack-laboration-3.onrender.com/api/user", {
				method: "GET",
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = await response.json();

			if (response.ok) {
				setUser(data.student);
			}
			//console.log(data.student);
		}
		getUserDetails();
	}, []);

	return (
		<div className={styles.profilecontainer}>
			<div className={styles.avatarcontainer}>
				{user.profile_picture && <Image src={user.profile_picture} width={150} height={150} alt={user.first_name + "profile picture"} />}
				{user.first_name} {user.last_name}
			</div>
			<div className={styles.infocontainer}>info</div>
			<div className={styles.groupcontainer}>groups</div>
			<div className={styles.eventscontainer}>event</div>
		</div>
	);
}
