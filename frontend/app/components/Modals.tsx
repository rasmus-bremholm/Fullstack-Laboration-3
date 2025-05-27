import styles from "../styles/modal.module.css";
import { useState, useEffect } from "react";
import type { User } from "../types/types";

interface EditProps {
	isOpen: boolean;
	onClose: () => void;
}

export function EditModal({ isOpen, onClose }: EditProps) {
	if (!isOpen) return null;

	return (
		<div className={styles.backdrop} onClick={onClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<h2>Edit Avatar</h2>
				<form action=''></form>
			</div>
		</div>
	);
}

export function EditStudentModal({ isOpen, onClose }: EditProps) {
	const [studentInfo, setStudentInfo] = useState<User>({
		id: 0,
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		profile_picture: null,
	});

	useEffect(() => {
		//
	}, []);

	const handleSubmit = async () => {
		const token = localStorage.getItem("token");
		const response = await fetch("https://fullstack-laboration-3.onrender.com/api/", {
			method: "POST",
			headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
			body: JSON.stringify({}),
		});

		if (response.ok) {
			console.log("Updaterade info om studenten med id: ");
			// Resetta fälten
		} else {
			console.error("Failade att uppdatera studenten ,", response.status);
		}
	};

	if (!isOpen) return null;
	return (
		<div className={styles.backdrop} onClick={onClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<h2>Edit Student</h2>
				<form onSubmit={handleSubmit}></form>
			</div>
		</div>
	);
}

export function DeleteModal({ isOpen, onClose }: EditProps) {
	if (!isOpen) return null;
	return (
		<div className={styles.backdrop} onClick={onClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<h2>Delete Student?</h2>
				<p>Are you sure you want to delete your account?</p>
				<div className={styles.buttoncontainer}>
					<button>Yes</button>
					<button>Also Yes</button>
				</div>
			</div>
		</div>
	);
}
