"use client";

import { Post } from "../types/types";
import styles from "../styles/posts.module.css";
import { useEffect, useState } from "react";
import Image from "next/image";
import { MoreVert } from "../icons/icons";

// const url = process.env.BACKEND_URL;
const url = "https://fullstack-laboration-3.onrender.com";
// https://fullstack-laboration-3.onrender.com

interface postsResponse {
	posts: Post[];
}

interface PostProps {
	refetchTrigger: boolean;
}

export default function Posts(refetchTrigger: PostProps) {
	const [posts, setPosts] = useState<Post[]>([]);

	const dateFormatter = (time: string) => {
		return new Date(time).toLocaleString("sv-SE", {
			dateStyle: "short",
			timeStyle: "short",
		});
	};

	useEffect(() => {
		const token = localStorage.getItem("token");
		async function fetchPosts() {
			const response = await fetch(`${url}/api/posts`, {
				method: "GET",
				headers: { Authorization: `Bearer ${token}` },
			});
			const { posts } = (await response.json()) as postsResponse;
			//console.log(posts);
			setPosts(posts);
		}
		fetchPosts();
	}, [refetchTrigger]);

	if (!posts) return <div style={{ marginTop: "1.5rem" }}>Logga in för att se inläggen...</div>;

	return (
		<>
			{posts.map((post: Post) => (
				<article className={styles.post} key={post.id}>
					<div className={styles.postheader}>
						<Image src={post.profile_picture} alt={post.first_name + "avatar"} width={18} height={18} />
						{post.first_name} {post.last_name}
						<p className={styles.timestamp}>{dateFormatter(post.created_at)}</p>
						<MoreVert />
					</div>
					<div className={styles.postcontent}>{post.text}</div>
				</article>
			))}
		</>
	);
}
