// Intressant som fan https://nextjs.org/docs/app/getting-started/updating-data
// https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData
// https://www.youtube.com/watch?v=DJvM2lSPn6w
/*
export async function createPost(formData: FormData) {
	"use server";
	const title = formData.get("title");
}
*/

export async function login(formData: FormData) {
	const user = { email: formData.get("email"), password: formData.get("password") };
	// Do a fetch against database to check credentials, if user.email and user.password matches. Set the cookies.
}
