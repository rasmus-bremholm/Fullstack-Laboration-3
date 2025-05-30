// Referensbild
//https://www.sliderrevolution.com/wp-content/uploads/2021/06/boot1.jpg
"use client";

import styles from "../styles/profile.module.css";
import type { User, Profile_Event } from "../types/types";
import { useState, useEffect } from "react";
import Image from "next/image";
import { EditIcon, DeleteStudent } from "../icons/icons";
import { EditModal, DeleteModal, EditStudentModal } from "../components/Modals";
import { Divider } from "@mui/material";

export default function Profile() {
	const [editModal, setEditModal] = useState(false);
	const [editStudentModal, setEditStudentModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [user, setUser] = useState<User>({
		id: 0,
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		profile_picture: null,
	});
	const [events, setEvents] = useState<Profile_Event[]>([]);

	useEffect(() => {
		async function getUserDetails() {
			const token = localStorage.getItem("token");

			const response = await fetch("https://fullstack-laboration-3.onrender.com/api/user", {
				method: "GET",
				headers: { Authorization: `Bearer ${token}` },
			});
			const data = await response.json();

			if (response.ok) {
				console.log(data);
				setUser(data.student);
				setEvents(data.events);
			}
			//console.log(data.student);
		}
		getUserDetails();
	}, [editModal]);

	return (
		<div className={styles.profilecontainer}>
			<div className={styles.avatarcontainer}>
				{user.profile_picture && (
					<Image className={styles.profilepicture} src={user.profile_picture} width={150} height={150} alt={user.first_name + "profile picture"} />
				)}
				<div>
					<h2>
						{user.first_name} {user.last_name}
					</h2>
				</div>
				<div className={styles.container}>
					<p>
						Lorem ipsum dolor sit amet consectetur, adipisicing elit. Soluta sequi adipisci ipsum iste odit doloribus consequatur voluptatibus id
						explicabo! Facilis!
					</p>
				</div>
				<div className={styles.container}>
					<EditIcon onClick={() => setEditModal(true)} />
					<DeleteStudent onClick={() => setDeleteModal(true)} />
				</div>
			</div>
			<EditModal isOpen={editModal} onClose={() => setEditModal(false)} />
			<DeleteModal isOpen={deleteModal} onClose={() => setDeleteModal(false)} />
			<div className={styles.infocontainer}>
				<div className={styles.infofield}>
					<p>Full Name: </p>
					<p>
						{user.first_name}
						{user.last_name}
					</p>
				</div>
				<Divider />
				<div className={styles.infofield}>
					<p>Email: </p>
					<p>{user.email}</p>
				</div>
				<Divider />
				<div className={styles.infofield}>
					<p>Password: </p>
					<p>{"*".repeat(user.password.length)}</p>
				</div>
				<Divider />
				<div className={styles.infofield}>
					<p>Phone Number: </p>
					<p>N/A</p>
				</div>
				<Divider />
				<div className={styles.infofield}>
					<p>Adress: </p>
					<p>N/A</p>
				</div>
				<Divider />
				<button className={styles.editbutton} onClick={() => setEditStudentModal(true)}>
					Edit
				</button>
				<EditStudentModal isOpen={editStudentModal} onClose={() => setEditStudentModal(false)} />
			</div>
			<div className={styles.logscontainer}>
				<h3>Loggbok</h3>
				<form>
					{/* Installera Quill och ersätt detta med en ritch text editor */}
					<textarea name='' id=''></textarea>
					<button type='submit'>Spara</button>
				</form>
			</div>
			<div className={styles.eventscontainer}>
				<h3>Lektioner</h3>
				{events &&
					events.map((event) => (
						<div key={event.id}>
							<p>{event.title}</p>
							<p>
								{event.start_time} - {event.end_time} - {event.weekday}
							</p>
							<Divider />
						</div>
					))}
			</div>
		</div>
	);
}
