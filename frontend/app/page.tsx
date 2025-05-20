"use client";
import styles from "./styles/feed.module.css";
import extrastyles from "./page.module.css";
import Image from "next/image";
import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import Posts from "./components/Posts";

export default function Home() {
	const [postText, setPostText] = useState("");
	const [isFocused, setIsFocused] = useState(false);
	const [disabeledSubmit, setDisabledSubmit] = useState(true);

	useEffect(() => {
		// Validera input
		if (postText.length > 0) {
			setDisabledSubmit(false);
		} else {
			setDisabledSubmit(true);
		}
	}, [postText]);

	const handleSubmit = async (event: React.FormEvent) => {
		// Hello
		event.preventDefault();

		const response = await fetch("https://fullstack-laboration-3.onrender.com/api/posts",{
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({})
		});
		setPostText("");
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
					</div>
				</form>
			</div>
			<Posts />
		</div>
	);
}
