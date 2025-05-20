export interface user {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	profile_picture: string;
}

export interface shedule_event {
	id: number;
	date: Date;
	start_time: number;
	end_time: number;
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
