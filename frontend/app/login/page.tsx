"use client";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import { login } from "../actions/form";
import { login_form_fields } from "../types/types";

export default function Login() {
	const [signup, setSignUp] = useState(false);
	const [submitDisabeled, setSubmitDisabled] = useState(true);
	const [userLoginDetails, setUserLoginDetails] = useState<login_form_fields>({
		email: "",
		password: "",
	});

	function swapSignInSignUp() {
		setSignUp(!signup);
	}

	useEffect(() => {
		if (userLoginDetails.email.length > 1 && userLoginDetails.password.length > 1) {
			setSubmitDisabled(false);
		} else {
			setSubmitDisabled(true);
		}
	}, [userLoginDetails]);

	if (!signup) {
		return (
			<div>
				<form
					action={async (formData) => {
						"use server";
						await login(formData);
						redirect("/");
					}}>
					<input
						type='email'
						name='email'
						value={userLoginDetails.email}
						placeholder='you@email.com'
						onChange={(event) => setUserLoginDetails({ ...userLoginDetails, [event.target.name]: event.target.value })}
					/>
					<input
						type='password'
						name='password'
						value={userLoginDetails.password}
						placeholder='Password'
						onChange={(event) => setUserLoginDetails({ ...userLoginDetails, [event.target.name]: event.target.value })}
					/>
					<input type='submit' value='Login' disabled={submitDisabeled} />
				</form>
				<p onClick={swapSignInSignUp}>Registrera Användare?</p>
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
					<input
						type='email'
						name='email'
						value={userLoginDetails.email}
						placeholder='you@email.com'
						onChange={(event) => setUserLoginDetails({ ...userLoginDetails, [event.target.name]: event.target.value })}
					/>
					<input
						type='password'
						name='password'
						value={userLoginDetails.password}
						placeholder='Password'
						onChange={(event) => setUserLoginDetails({ ...userLoginDetails, [event.target.name]: event.target.value })}
					/>
					<input type='submit' value='Sign Up' disabled={submitDisabeled} />
				</form>
				<p onClick={swapSignInSignUp}>Har du redan ett konto? Logga In</p>
			</div>
		);
	}
}
