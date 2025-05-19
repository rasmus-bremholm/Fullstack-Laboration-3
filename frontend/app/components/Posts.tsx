"use client";
import { post } from "../types/types";
import styles from "../styles/posts.module.css";
import { useEffect, useState } from "react";

// const url = process.env.BACKEND_URL;
const url = "https://fullstack-laboration-3.onrender.com";
// https://fullstack-laboration-3.onrender.com

export default function Posts() {
	const [posts, setPosts] = useState<post[]>([]);

	useEffect(() => {
		async function fetchPosts() {
			const response = await fetch(`${url}/api/posts`, {
				method: "GET",
			});
			const posts = await response.json();
			setPosts(posts);
		}
		fetchPosts();
	}, []);

	if (!posts) return <div>Logga in för att se dina poster....eller vänta på att backenden spinnar upp</div>;

	return (
		<>
			{posts.map((post: post) => (
				<article className={styles.post} key={post.id}>
					<div className={styles.postheader}>post.title</div>
					<div className={styles.postcontent}>Lorem Ipsum</div>
				</article>
			))}
		</>
	);
}
