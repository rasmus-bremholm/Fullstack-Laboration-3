export interface User {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	profile_picture: string | null;
}

// Borde byta namn på dessa. Shedule Event är responsen vi får tillbaka
export interface Schedule_Event {
	title: string;
	weekday: Weekday;
	start: string;
	end: string;
}

// Medans calendar event är saken vi petar in i usestate.
export interface Calendar_Event {
	title: string;
	start: Date;
	end: Date;
}

export interface Group {
	id: number;
	name: string;
	description: string;
}

export interface Post {
	id: number;
	text: string;
	first_name: string;
	last_name: string;
	group_id: number;
	comments: Comment;
	created_at: string;
	profile_picture: string;
}

export interface Comment {
	id: number;
	text: string;
	sender: number;
}

export interface Login_Form_Fields {
	email: string;
	password: string;
}

export type Weekday = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
