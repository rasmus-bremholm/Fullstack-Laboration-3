"use client";
import { useEffect, useState } from "react";
import { login_form_fields } from "../types/types";
import { useRouter } from "next/navigation";

export default function Login() {
	const [signup, setSignUp] = useState(false);
	const router = useRouter();
	const [submitDisabeled, setSubmitDisabled] = useState(true);
	const [userLoginDetails, setUserLoginDetails] = useState<login_form_fields>({
		email: "",
		password: "",
	});

	const handleSignUpSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		// rest of signup fetch
	};

	const handleLoginSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		const response = await fetch("https://fullstack-laboration-3.onrender.com/api/login", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ email: userLoginDetails.email, password: userLoginDetails.password }),
		});

		if (response.ok) {
			const data = await response.json();
			localStorage.setItem("token", data.token);
			console.log("Vi loggade in");
			router.push("/");
		} else {
			console.log("Login failade");
		}
	};

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
				<form onSubmit={handleLoginSubmit}>
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
				<form onSubmit={handleSignUpSubmit}>
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
