// Intressant som fan https://nextjs.org/docs/app/getting-started/updating-data
// https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
// https://www.youtube.com/watch?v=DJvM2lSPn6w
/*
export async function createPost(formData: FormData) {
	"use server";
	const title = formData.get("title");
}
*/

interface LoginResponse {
	sucess: boolean;
	id: number;
}

const baseurl = process.env.BACKEND_URL;

export async function login(formData: FormData) {
	"use server";
	const user = { email: formData.get("email"), password: formData.get("password") };
	// Do a fetch against database to check credentials, if user.email and user.password matches. Set the cookies.
	if (baseurl) {
		try {
			const response = await fetch(baseurl + "/api/login", {
				method: "POST",
				body: JSON.stringify(user),
			});
			if (!response.ok) {
				console.error("Login Failed");
				throw new Error(`Response status ${response.status}`);
			}

			const data: LoginResponse = await response.json();
			console.log("Sucessfully logged in user ID", data.id);
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error(error.message);
			}
		}
	}
}
