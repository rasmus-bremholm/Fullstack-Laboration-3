export interface user {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	profile_picture: string;
}

export interface schedule_event {
	title: string;
	weekday: weekday;
	start: string;
	end: string;
}

export interface group {
	id: number;
	name: string;
	description: string;
}

export interface post {
	id: number;
	text: string;
	first_name: string;
	last_name: string;
	group_id: number;
	comments: comment;
}

export interface comment {
	id: number;
	text: string;
	sender: number;
}

export interface login_form_fields {
	email: string;
	password: string;
}

export type weekday = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
