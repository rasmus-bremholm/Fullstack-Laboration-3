import styles from "../styles/modal.module.css";
import { useState, useEffect } from "react";
import type { User } from "../types/types";
import { Divider } from "@mui/material";
import { useAuth } from "../utils/authcontext";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Image from "next/image";

interface EditProps {
	isOpen: boolean;
	onClose: () => void;
}

export function EditModal({ isOpen, onClose }: EditProps) {
	const [selectedAvatar, setSelectedAvatar] = useState<string>("");
	const editProfilePictureSucess = () => toast.success("Ny profilbild vald");

	const avatarArray = [
		"default-avatar",
		"avatar_male_1",
		"avatar_male_2",
		"avatar_male_3",
		"avatar_female_1",
		"avatar_female_2",
		"avatar_female_3",
		"avatar_meme_1",
		"avatar_meme_2",
	];

	if (!isOpen) return null;

	// OG image path: /images/default-avatar.png

	const selectAvatar = (avatar: string) => {
		// Jag gör detta till en funktion ifall ja skulle vilja göra något mer här.
		// Men toasten ska nog visas när jag submittar....hurrm
		setSelectedAvatar(avatar);
	};

	const handleSubmit = async () => {
		if (selectedAvatar) {
			const token = localStorage.getItem("token");
			const response = await fetch("https://fullstack-laboration-3.onrender.com/api/students", {
				method: "PATCH",
				body: JSON.stringify({ profile_picture: selectedAvatar }),
				headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
			});

			if (response.ok) {
				console.log("Uppdaterade profilbilden!");
				editProfilePictureSucess();
				setSelectedAvatar("");
				onClose();
			} else {
				console.log("Kunde inte uppdatera bilden");
			}
		} else {
			console.log("Ingen bild vald");
			setSelectedAvatar("");
			onClose();
		}
	};

	return (
		<div className={styles.backdrop} onClick={onClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<h2>Edit Avatar</h2>
				<p>Select a new avatar</p>
				<div className={styles.avatarcontainer}>
					{avatarArray.map((avatar, index) => (
						<div
							className={`${styles.avatarwrapper} ${selectedAvatar === avatar ? styles.selected : ""}`}
							key={index}
							onClick={() => selectAvatar(avatar)}>
							<Image src={`/images/${avatar}.png`} alt={avatar} height={50} width={50} />
						</div>
					))}
				</div>
				<button className={styles.button} onClick={handleSubmit}>
					Save
				</button>
			</div>
		</div>
	);
}

export function EditStudentModal({ isOpen, onClose }: EditProps) {
	const editSucessToast = () => toast.success("Ändringarna sparades");
	const editFailToast = () => toast.error("Ett problem inträffade");
	const [studentInfo, setStudentInfo] = useState<User>({
		id: 0,
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		profile_picture: null,
	});
	const [disabeledSubmit, setDisabledSubmit] = useState(true);

	useEffect(() => {
		const isFormFilled = !!studentInfo.first_name || !!studentInfo.last_name || !!studentInfo.email || !!studentInfo.password;
		setDisabledSubmit(!isFormFilled);
	}, [studentInfo]);

	const handleSubmit = async (event: React.FormEvent) => {
		event?.preventDefault();
		const token = localStorage.getItem("token");
		const response = await fetch("https://fullstack-laboration-3.onrender.com/api/students", {
			method: "PUT",
			headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
			body: JSON.stringify({
				first_name: studentInfo.first_name,
				last_name: studentInfo.last_name,
				email: studentInfo.email,
				password: studentInfo.password,
			}),
		});

		if (response.ok) {
			console.log("Updaterade info om studenten med id: ");
			editSucessToast();
			setStudentInfo({ id: 0, first_name: "", last_name: "", email: "", password: "", profile_picture: null });
		} else {
			console.error("Failade att uppdatera studenten ,", response.status);
			editFailToast();
		}
	};

	if (!isOpen) return null;
	return (
		<div className={styles.backdrop} onClick={onClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<h2>Edit Student</h2>
				<form onSubmit={handleSubmit}>
					<label htmlFor='first_name'>First Name:</label>
					<input type='text' name='first_name' onChange={(event) => setStudentInfo({ ...studentInfo, [event.target.name]: event.target.value })} />
					<Divider />
					<label htmlFor='last_name'>Last Name:</label>
					<input type='text' name='last_name' onChange={(event) => setStudentInfo({ ...studentInfo, [event.target.name]: event.target.value })} />
					<Divider />
					<label htmlFor='email'>Email:</label>
					<input type='email' name='email' onChange={(event) => setStudentInfo({ ...studentInfo, [event.target.name]: event.target.value })} />
					<Divider />
					<label htmlFor='password'>Password:</label>
					<input type='text' name='password' onChange={(event) => setStudentInfo({ ...studentInfo, [event.target.name]: event.target.value })} />
					<button type='submit' disabled={disabeledSubmit}>
						Save
					</button>
				</form>
			</div>
		</div>
	);
}

export function DeleteModal({ isOpen, onClose }: EditProps) {
	const deleteSucessToast = () => toast.warn("Kontot raderat");
	const deleteFailToast = () => toast.success("Kunde inte radera konto");
	const { logout } = useAuth();
	const router = useRouter();

	const handleDelete = async () => {
		const token = localStorage.getItem("token");
		const response = await fetch("https://fullstack-laboration-3.onrender.com/api/students", {
			method: "DELETE",
			headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
		});

		if (response.ok) {
			console.log("Studenten deletades från databasen");
			deleteSucessToast();
			logout();
			router.push("/");
		} else {
			deleteFailToast();
			console.log("Något fick fel", response.status);
		}
	};

	if (!isOpen) return null;
	return (
		<div className={styles.backdrop} onClick={onClose}>
			<div className={styles.modal} onClick={(e) => e.stopPropagation()}>
				<h2>Delete Student?</h2>
				<p>Are you sure you want to delete your account?</p>
				<div className={styles.buttoncontainer}>
					<button onClick={() => handleDelete()}>Yes</button>
					<button>No</button>
				</div>
			</div>
		</div>
	);
}
