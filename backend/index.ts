// Imports
import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { Client, QueryResult } from "pg";

/*
	Frågor till Vanja/Jon handledning.

*/

/*
	TODO:
	- Fixa "avatar" bilden i databasen. Måste bara lägga till typen här så den kommer med.

*/

// Global Variables
const port = process.env.PORT || 1338;
// Fy fan för cors. Nära att faila hela labben här och bara gråta.
const allowedOrigins = ["http://localhost:3000", "http://localhost:1338", "https://fullstack-laboration-3.vercel.app"];

// Initialisation
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
	cors({
		origin: (origin, callback) => {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
			} else {
				callback(new Error("Cors funkade inte"));
			}
		},
		credentials: true,
	})
);
dotenv.config();
const client = new Client({
	connectionString: process.env.PGURI,
});
client.connect();
// Test

// Interfaces
interface Student {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
	profile_picture: string;
}

interface Group {
	id: number;
	name: string;
	description: string;
}

interface Shedule {
	weekday: string;
	start_time: string;
	end_time: string;
}

interface LoginFormData {
	email: string;
	password: string;
}

// Helper functions
const getUserIdFromCookies = (req: Request): number | null => {
	const token = req.cookies.token;
	const userId = parseInt(token);
	if (isNaN(userId)) {
		return null;
	} else {
		return userId;
	}
};

//--------------------------------------------------------------------
// Routes
//--------------------------------------------------------------------

app.get("/", (_req, res) => {
	res.status(200).send({ message: "Hello World" });
});

// Student Routes

app.get("/api/students", async (_req, res) => {
	console.log("hej");
	const { rows }: { rows: Student[] } = await client.query("SELECT * FROM students");
	res.status(200).send(rows);
});

// Ok denna routen är den ultimata final bossen ifall min cookie auth fungerar.
// Väldigt lik students/id fast nu läser jag enbart från cookies för att få mitt id. Vilket betyder att vi måste vara inloggade.
app.get("/api/user", async (req: Request, res: Response): Promise<void> => {
	const token: string = req.cookies.token;
	const studentId = parseInt(token);
	if (isNaN(studentId)) {
		res.status(400).send({ error: "Ingen giltig token" });
	}

	try {
		const student = await client.query<Student>("SELECT * FROM students WHERE id=$1", [studentId]);
		const schedule = await client.query<Shedule>("SELECT weekday, start_time, end_time FROM weekly_schedule WHERE student_id=$1", [studentId]);
		const groups = await client.query<Group>(
			"SELECT groups.id, groups.name, groups.description FROM group_members JOIN groups ON groups.id = group_members.group_id WHERE group_members.student_id=$1",
			[studentId]
		);
		const events = await client.query<Event>(
			"SELECT events.* FROM events JOIN group_members ON events.group_id = group_members.group_id WHERE group_members.student_id=$1",
			[studentId]
		);
		res.status(200).send({ student: student.rows[0], schedule: schedule.rows, groups: groups.rows, events: events.rows });
		//console.log(student, schedule, groups, events);
	} catch (error) {
		res.status(500).send({ error: "Something went wrong, stupid" }) as Response;
	}
});

app.get("/api/students/:id", async (req, res) => {
	const studentId = parseInt(req.params.id);
	if (isNaN(studentId)) {
		res.status(400).send({ error: "Id needs to be a number" });
	}

	try {
		const student = await client.query<Student>("SELECT * FROM students WHERE id=$1", [studentId]);
		const schedule = await client.query<Shedule>("SELECT weekday, start_time, end_time FROM weekly_schedule WHERE student_id=$1", [studentId]);
		const groups = await client.query<Group>(
			"SELECT groups.id, groups.name, groups.description FROM group_members JOIN groups ON groups.id = group_members.group_id WHERE group_members.student_id=$1",
			[studentId]
		);
		const events = await client.query<Event>(
			"SELECT events.* FROM events JOIN group_members ON events.group_id = group_members.group_id WHERE group_members.student_id=$1",
			[studentId]
		);
		res.status(200).send({ student: student.rows[0], schedule: schedule.rows, groups: groups.rows, events: events.rows });
		console.log(student, schedule, groups, events);
	} catch (error) {
		res.status(500).json({ error: "Something went wrong, stupid" });
	}
});

app.post("/api/students", async (req, res) => {
	try {
		const result: QueryResult = await client.query(
			"INSERT INTO students (first_name, last_name, email, password, profile_picture) VALUES ($1, $2, $3, $4, $5)",
			[req.body.first_name, req.body.last_name, req.body.email, req.body.password, req.body.profile_picture]
		);

		if (result?.rowCount && result.rowCount > 0) {
			// Sucess
			res.status(201).send({ message: "Student created" });
		} else {
			// Fail
			res.status(400).send({ error: "Student couldnt be inserted" });
		}
	} catch (error) {
		res.status(500).send({ error: "Couldnt insert student into database" });
	}
});

app.put("/api/students/:id", async (req, res) => {
	const studentId = parseInt(req.params.id);
	if (isNaN(studentId)) {
		res.status(400).send({ error: "Id needs to be a number" });
	}
	try {
		const result: QueryResult = await client.query(
			"UPDATE students SET first_name=$2, last_name=$3, email=$4, password=$5, profile_picture=$6 WHERE id=$1",
			[studentId, req.body.first_name, req.body.last_name, req.body.email, req.body.password, req.body.profile_picture]
		);
		if (result.rowCount && result.rowCount > 0) {
			res.status(200).send({ message: "Updated student information" });
		}
	} catch (error) {
		res.status(500).send({ error: "Couldnt update student" });
	}
});

app.delete("/api/students/:id", async (req, res) => {
	const studentId = parseInt(req.params.id);
	if (isNaN(studentId)) {
		res.status(400).send({ error: "Id needs to be a number" });
	}

	try {
		const result: QueryResult = await client.query("DELETE FROM students WHERE id=$1", [studentId]);
		if (result.rowCount && result.rowCount > 0) {
			res.status(204).send({ message: "Student Deleted" });
		}
	} catch (error) {
		res.status(500).send({ error: "Couldnt delete student" });
	}
});

// Groups
app.get("/api/groups", async (req: Request, res: Response) => {
	const token = req.cookies.token;
	const studentId = parseInt(token);

	if (isNaN(studentId)) {
		res.status(401).send({ error: "Ingen/ogiltilg token" });
	}

	try {
		const result = await client.query<Group>(
			"SELECT groups.id, groups.name, groups.description FROM group_members JOIN groups ON group_members.group_id = groups.id WHERE group_members.student_id = $1",
			[studentId]
		);
		res.status(200).send({ groups: result.rows });
	} catch (error: unknown) {
		console.error(error);
		res.status(500).send({ error: "Failed to get groups" });
	}
});

// Login

app.post("/api/login", async (req, res) => {
	console.log("Post Login");
	console.log("Login info sent to server: ", req.body);

	try {
		const { email, password }: LoginFormData = req.body;
		const result = await client.query("SELECT * FROM students WHERE email=$1", [email]);
		const user: Student = result.rows[0];

		// Validerar alla uppgifter
		if (!user || user.password !== password) {
			res.status(401).send({ error: "Invalid Email or Password" });
		}

		res.cookie("token", user.id, {
			httpOnly: true,
			secure: true,
			// Denna jäveln!!!!
			sameSite: "none",
			path: "/",
			maxAge: 60 * 60 * 24, // Detta borde vara en dag ifall jag räknat rätt.
		});
		console.log("Setting cookie for user: ", user.id);
		res.status(200).send({ sucess: true, id: user.id });
	} catch (error: unknown) {
		console.log("Login Error", error);
		res.status(500).send({ error: "Something went wrong" });
	}
});

app.post("/api/logout", async (req, res) => {
	// Logout
	res.clearCookie("token");
	res.status(204).send({ message: "Logged out" });
});

// Posts

app.get("/api/posts", async (req, res) => {
	console.log("Get Posts loggas");

	try {
		const token: string = req.cookies.token;
		const studentId = parseInt(token);
		if (isNaN(studentId)) {
			res.status(401).send({ error: "Ingen/ogiltilg token" });
		}
		const result = await client.query(
			"SELECT posts.id, posts.text, posts.group_id, students.first_name, students.last_name FROM posts JOIN students ON posts.sender_id = students.id JOIN group_members ON posts.group_id = group_members.group_id WHERE group_members.student_id=$1",
			[studentId]
		);
		res.status(200).send({ posts: result.rows });
	} catch (error: unknown) {
		console.log("Couldnt get posts");
		res.status(500).send({ error: "Vi kunde inte fetcha posterna." });
	}
});

app.post("/api/posts", async (req: Request, res: Response) => {
	console.log("Post Post loggas");
	const token: string = req.cookies.token;
	const senderId = parseInt(token);

	if (!senderId) {
		console.log("Ingen cookie");
		res.status(401).send({ error: "Inte inloggad, kan inte posta" });
	} else {
		const { text, group_id } = req.body;
		try {
			await client.query("INSERT INTO posts (sender_id, text, group_id) VALUES ($1,$2,$3)", [senderId, text, group_id]);
			console.log("Post skapad!");
			res.status(201).send({ message: "Post skickad" });
		} catch (error: unknown) {
			console.error(error);
			res.status(500).send({ error: "Något gick fel på servern" });
		}
	}
});

// Settingup server

app.listen(port, () => {
	console.log("Server is running on http://localhost:" + port);
});
