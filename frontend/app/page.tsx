"use client";
import styles from "./styles/feed.module.css";
import extrastyles from "./page.module.css";
import Image from "next/image";
import { Divider } from "@mui/material";
import { useState } from "react";

export default function Home() {
	const [postText, setPostText] = useState("");
	const [isFocused, setIsFocused] = useState(false);
	const [disabeledSubmit, setDisabledSubmit] = useState(true);

	const handleSubmit = () => {
		// Hello
	};

	return (
		<div className={styles.feed}>
			<div className={styles.createpost}>
				<form action={handleSubmit}>
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
		</div>
	);
}
