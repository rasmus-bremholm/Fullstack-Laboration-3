"use client";
import { useState } from "react";

export default function Login() {
	const [signup] = useState(false);

	if (!signup) {
		return (
			<div>
				<form action=''>
					<input type='email' name='email' />
					<input type='password' name='password' />
					<input type='submit' value='Login' />
				</form>
			</div>
		);
	} else {
		return (
			<div>
				<form action=''>
					<input type='email' name='email' />
					<input type='password' name='password' />
					<input type='submit' value='Sign Up' />
				</form>
			</div>
		);
	}
}
