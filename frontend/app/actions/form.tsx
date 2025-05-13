// Intressant som fan https://nextjs.org/docs/app/getting-started/updating-data
// https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData

export async function createPost(formData: FormData) {
	"use server";
	const title = formData.get("title");
}
