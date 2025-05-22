"use client";
import { useEffect, useState } from "react";
import { login_form_fields } from "../types/types";
import { useRouter } from "next/navigation";
import styles from "../styles/login.module.css";

export default function Login() {
	const [signup, setSignUp] = useState(false);
	const router = useRouter();
	const [submitDisabeled, setSubmitDisabled] = useState(true);
	const [userLoginDetails, setUserLoginDetails] = useState<login_form_fields>({
		email: "",
		password: "",
	});
	const [userSignUpDetails, setuserSignUpDetails] = useState({
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		repeat_password: "",
	});

	const [passwordMatch, setPasswordMatch] = useState(false);

	const handleSignUpSubmit = async (event: React.FormEvent) => {
		event.preventDefault();

		const response = await fetch("https://fullstack-laboration-3.onrender.com/api/students", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				first_name: userSignUpDetails.first_name,
				last_name: userSignUpDetails.last_name,
				email: userSignUpDetails.email,
				password: userSignUpDetails.password,
			}),
		});

		if (response.ok) {
			console.log("Vi skapade ditt konto!");
		} else {
			console.error("Vi kunde inte skapa kontot", response.status);
		}
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
		function validateInputs() {
			if (userLoginDetails.email.length > 1 && userLoginDetails.password.length > 1) {
				setSubmitDisabled(false);
			} else {
				setSubmitDisabled(true);
			}
		}
		validateInputs();
	}, [userLoginDetails]);

	useEffect(() => {
		function validateInputs() {
			if (userSignUpDetails.first_name && userSignUpDetails.last_name && userSignUpDetails.email && userSignUpDetails.password) {
				setSubmitDisabled(false);
			} else {
				setSubmitDisabled(true);
			}
		}
		function validatePassword() {
			// Asså ifall vi är fancy, så skulle vi kunna kolla ifall lösenordet uppfyller vissa krav med regex.
			if (userSignUpDetails.password === userSignUpDetails.repeat_password) {
				setPasswordMatch(true);
			} else {
				setPasswordMatch(false);
			}
		}
		validateInputs();
		validatePassword();
	}, [userSignUpDetails]);

	if (!signup) {
		return (
			<div className={styles.loginwrapper}>
				<div className={styles.logincontainer}>
					<h1>Logga In</h1>
					<form onSubmit={handleLoginSubmit}>
						<div className={styles.inputcontainer}>
							<label htmlFor='email'>Email</label>
							<input
								id='email'
								type='email'
								name='email'
								value={userLoginDetails.email}
								placeholder='you@email.com'
								onChange={(event) => setUserLoginDetails({ ...userLoginDetails, [event.target.name]: event.target.value })}
							/>
						</div>
						<div className={styles.inputcontainer}>
							<label htmlFor='password'>Password</label>
							<input
								id='password'
								type='password'
								name='password'
								value={userLoginDetails.password}
								placeholder='Password'
								onChange={(event) => setUserLoginDetails({ ...userLoginDetails, [event.target.name]: event.target.value })}
							/>
						</div>
						<input type='submit' value='Login' disabled={submitDisabeled} />
					</form>
					<p onClick={swapSignInSignUp}>Har du inget konto? Registrera dig här!</p>
				</div>
			</div>
		);
	} else {
		return (
			<div className={styles.loginwrapper}>
				<div className={styles.logincontainer}>
					<h1>Skapa konto</h1>
					<form onSubmit={handleSignUpSubmit}>
						<div className={styles.inputcontainer}>
							<label htmlFor='first_name'>First Name</label>
							<input
								id='first_name'
								type='text'
								name='first_name'
								value={userSignUpDetails.email}
								placeholder='FirstName'
								onChange={(event) => setuserSignUpDetails({ ...userSignUpDetails, [event.target.name]: event.target.value })}
							/>
						</div>
						<div className={styles.inputcontainer}>
							<label htmlFor='last_name'>Last Name</label>
							<input
								id='last_name'
								type='text'
								name='last_name'
								value={userSignUpDetails.email}
								placeholder='LastName'
								onChange={(event) => setuserSignUpDetails({ ...userSignUpDetails, [event.target.name]: event.target.value })}
							/>
						</div>
						<div className={styles.inputcontainer}>
							<label htmlFor='email'>Password</label>
							<input
								id='email'
								type='email'
								name='email'
								value={userSignUpDetails.email}
								placeholder='you@email.com'
								onChange={(event) => setuserSignUpDetails({ ...userSignUpDetails, [event.target.name]: event.target.value })}
							/>
						</div>
						<div className={styles.inputcontainer}>
							<label htmlFor='password'>Password</label>
							<input
								id='password'
								type='password'
								name='password'
								value={userSignUpDetails.password}
								placeholder='Password'
								onChange={(event) => setuserSignUpDetails({ ...userSignUpDetails, [event.target.name]: event.target.value })}
							/>
						</div>
						<div className={styles.inputcontainer}>
							<label htmlFor=''></label>
							<input
								id='repeat-password'
								type='password'
								name='repeat_password'
								value={userSignUpDetails.repeat_password}
								placeholder='Password Again'
								onChange={(event) => setuserSignUpDetails({ ...userSignUpDetails, [event.target.name]: event.target.value })}
							/>
							{!passwordMatch && <p className='alert'>Passwords do not match!</p>}
						</div>

						<input type='submit' value='Sign Up' disabled={submitDisabeled} />
					</form>
					<p onClick={swapSignInSignUp}>Har du redan ett konto? Logga In</p>
				</div>
			</div>
		);
	}
}
