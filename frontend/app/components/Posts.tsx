"use client";
import { post } from "../types/types";
import styles from "../styles/posts.module.css";
import { useEffect, useState } from "react";

// const url = process.env.BACKEND_URL;
const url = "https://fullstack-laboration-3.onrender.com";
// https://fullstack-laboration-3.onrender.com
const token = localStorage.getItem("token");

interface postsResponse {
	posts: post[];
}

interface PostProps {
	refetchTrigger: boolean;
}

export default function Posts(refetchTrigger: PostProps) {
	const [posts, setPosts] = useState<post[]>([]);

	useEffect(() => {
		async function fetchPosts() {
			const response = await fetch(`${url}/api/posts`, {
				method: "GET",
				headers: { Authorization: `Bearer ${token}` },
			});
			const { posts } = (await response.json()) as postsResponse;
			console.log(posts);
			setPosts(posts);
		}
		fetchPosts();
	}, [refetchTrigger]);

	if (!posts) return <div>Logga in för att se dina poster....eller vänta på att backenden spinnar upp</div>;

	return (
		<>
			{posts.map((post: post) => (
				<article className={styles.post} key={post.id}>
					<div className={styles.postheader}>
						{post.first_name} {post.last_name}
						<span className={`material-symbols-outlined ${styles.icon}`}>more_horiz</span>
					</div>
					<div className={styles.postcontent}>{post.text}</div>
				</article>
			))}
		</>
	);
}
