"use client";

import { useState, useEffect } from "react";

const url = "https://fullstack-laboration-3.onrender.com";

interface messageResponse {
	message: string;
}

export default function Test() {
	const [data, setData] = useState<messageResponse | null>(null);

	useEffect(() => {
		async function fetchData() {
			try {
				const response = await fetch(url);
				if (!response.ok) {
					throw new Error(`Response status: ${response.status}`);
				}
				const json = await response.json();
				setData(json);
				console.log(json);
			} catch (error: unknown) {
				if (error instanceof Error) {
					console.error(error.message);
				}
			}
		}
		fetchData();
	}, []);

	return <p>{data?.message}</p>;
}
