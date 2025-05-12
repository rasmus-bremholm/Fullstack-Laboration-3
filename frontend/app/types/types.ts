export interface user {
	id: number;
	first_name: string;
	last_name: string;
	is_admin: boolean;
	email: string;
	password: string;
	avatar: string;
}

export interface shedule_event {
	id: number;
	date: Date;
	start_time: number;
	end_time: number;
}

export interface group {
	id: number;
}

export interface post {
	id: number;
	text: string;
	sender: number;
	group: group;
	comments: comment;
}

export interface comment {
	id: number;
	text: string;
	sender: number;
}
