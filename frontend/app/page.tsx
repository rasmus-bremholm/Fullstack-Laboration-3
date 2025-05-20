"use client";
import styles from "./styles/feed.module.css";
import extrastyles from "./page.module.css";
import Image from "next/image";
import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import Posts from "./components/Posts";
import { group } from "./types/types";

export default function Home() {
	const [postText, setPostText] = useState("");
	const [groups, setGroups] = useState<group[] | []>([]);
	const [selectedGroup, setSelectedGroup] = useState(0);
	const [isFocused, setIsFocused] = useState(false);
	const [disabeledSubmit, setDisabledSubmit] = useState(true);
	// Min ful refetch gör en retur! Måste tvinga min child komponent att köra om useEffect.
	const [shouldRefetch, setShouldRefetch] = useState(false);

	// Multi useEffect DRIFTINGGGG
	// Svär till gud, fan 90% av alla komponenterna kommer vara client side i denna takten.
	useEffect(() => {
		// Validera input
		if (postText.length > 0 && groups) {
			setDisabledSubmit(false);
		} else {
			setDisabledSubmit(true);
		}
	}, [postText, groups]);

	useEffect(() => {
		async function GetGroups() {
			const response = await fetch("https://fullstack-laboration-3.onrender.com/api/groups", {
				credentials: "include",
			});

			if (response.ok) {
				const data = await response.json();
				setGroups(data.groups);
			} else {
				console.error("Frontenden kunde inte ta emot grupperna");
			}
		}
		GetGroups();
	}, []);

	const handleSubmit = async (event: React.FormEvent) => {
		// Hello
		event.preventDefault();

		const response = await fetch("https://fullstack-laboration-3.onrender.com/api/posts", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ text: postText, group_id: selectedGroup }),
		});

		if (response.ok) {
			console.log("Posten funkade!");
			setShouldRefetch(!shouldRefetch);
			setPostText("");
		} else {
			console.error("Failade att posta till backenden", response.status);
		}
	};

	return (
		<div className={styles.feed}>
			<div className={styles.createpost}>
				<form onSubmit={handleSubmit}>
					<div className={styles.inputcontainer}>
						<Image className={extrastyles.icons} src={"/images/default-avatar.png"} alt='avatar' width={24} height={24} />
						<textarea
							className={`${styles.textarea} ${isFocused ? "focused" : ""}`}
							name='post'
							placeholder="What's on your mind today?"
							value={postText}
							onChange={(event) => setPostText(event.target.value)}
							onFocus={() => setIsFocused(true)}
							onBlur={() => setIsFocused(false)}
							maxLength={256}
						/>
					</div>
					<Divider />
					<div className={styles.submitcontainer}>
						<button type='submit' disabled={disabeledSubmit}>
							<span className='material-symbols-outlined'>send</span>
							Post
						</button>
						<select onChange={(event) => setSelectedGroup(Number(event.target.value))}>
							{groups.map((group) => (
								<option key={group.id} value={group.id}>
									{group.name}
								</option>
							))}
						</select>
					</div>
				</form>
			</div>
			<Posts refetchTrigger={shouldRefetch} />
		</div>
	);
}
