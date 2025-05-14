"use client";
import { useState } from "react";
import { redirect } from "next/navigation";
import { login } from "../actions/form";

export default function Login() {
	const [signup] = useState(false);

	if (!signup) {
		return (
			<div>
				<form
					action={async (formData) => {
						"use server";
						await login(formData);
						redirect("/");
					}}>
					<input type='email' name='email' />
					<input type='password' name='password' />
					<input type='submit' value='Login' />
				</form>
			</div>
		);
	} else {
		return (
			<div>
				<form
					action={async (formData) => {
						"use server";
						await login(formData);
						redirect("/");
					}}>
					<input type='email' name='email' />
					<input type='password' name='password' />
					<input type='submit' value='Sign Up' />
				</form>
			</div>
		);
	}
}
