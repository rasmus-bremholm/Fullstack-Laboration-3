// Imports
import express from "express";
import type { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { Client, QueryResult } from "pg";
import jwt from "jsonwebtoken";
import { title } from "process";
import { start } from "repl";

/*
	TODO:
	- Fixa "avatar" bilden i databasen. Måste bara lägga till typen här så den kommer med.

*/

// Global Variables
const port = process.env.PORT || 1338;
// Fy fan för cors. Nära att faila hela labben här och bara gråta.
const allowedOrigins = ["http://localhost:3000", "http://localhost:1338", "https://fullstack-laboration-3.vercel.app"];
const JWT_SECRET = process.env.JWT_SECRET || "dev-secret";

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
				// Nu kan ja få reda på vilka origins som blockas.
				console.warn("CORS blocked origin", origin);
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

interface Schedule_Event {
	// In /api/user assign this type to the Events database call.
}

interface AuthRequest extends Request {
	user?: { id: number; email: string };
}

// Middleware
function authToken(req: AuthRequest, res: Response, next: NextFunction) {
	const authHeader = req.headers.authorization;

	if (!authHeader) res.status(401).send({ error: "Middleware: Missing token" });
	else {
		const token = authHeader.split(" ")[1];
		try {
			const decodedToken = jwt.verify(token, JWT_SECRET) as { id: number; email: string };
			req.user = decodedToken;
			next();
		} catch (error) {
			res.status(403).send({ error: "Middleware: Invalid Token" });
		}
	}
}

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
app.get("/api/user", authToken, async (req: AuthRequest, res: Response) => {
	const studentId = req.user!.id;
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
		console.log(events);
		res.status(200).send({ student: student.rows[0], schedule: schedule.rows, groups: groups.rows, events: events.rows });
	} catch (error) {
		res.status(500).send({ error: "Something went wrong, stupid" }) as Response;
	}
});

app.get("/api/students/:id", async (req, res) => {
	const studentId = parseInt(req.params.id);
	if (isNaN(studentId)) {
		res.status(400).send({ error: "Id needs to be a number" });
	} else {
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
	}
});

app.post("/api/students", async (req, res) => {
	try {
		const result: QueryResult = await client.query("INSERT INTO students (first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5)", [
			req.body.first_name,
			req.body.last_name,
			req.body.email,
			req.body.password,
		]);

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

app.put("/api/students", authToken, async (req: AuthRequest, res: Response) => {
	// Denna funktionen måste göras om senare, men just nu så får den peka mot redigera konto detaljer.
	const studentId = req.user!.id;
	try {
		const result: QueryResult = await client.query("UPDATE students SET first_name=$2, last_name=$3, email=$4, password=$5 WHERE id=$1", [
			studentId,
			req.body.first_name,
			req.body.last_name,
			req.body.email,
			req.body.password,
		]);
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
	} else {
		try {
			const result: QueryResult = await client.query("DELETE FROM students WHERE id=$1", [studentId]);
			if (result.rowCount && result.rowCount > 0) {
				res.status(204).send({ message: "Student Deleted" });
			}
		} catch (error) {
			res.status(500).send({ error: "Couldnt delete student" });
		}
	}
});

// Groups
app.get("/api/groups", authToken, async (req: AuthRequest, res: Response) => {
	console.log("Get Groups loggas");
	const studentId = req.user!.id;
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

app.post("/api/login", async (req, res) => {
	console.log("Login info sent to server: ", req.body);
	try {
		const { email, password }: LoginFormData = req.body;
		const result = await client.query("SELECT * FROM students WHERE email=$1", [email]);
		const user: Student = result.rows[0];

		if (!user || user.password !== password) {
			res.status(401).send({ error: "Invalid Email or Password" });
		} else {
			const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: "1d" });
			console.log("Genererade Token för user: ", user.id);
			res.status(200).send({ success: true, token });
		}
	} catch (error: unknown) {
		console.log("Login Error", error);
		res.status(500).send({ error: "Something went wrong" });
	}
});

app.post("/api/logout", async (req, res) => {
	// Client tar bort jwt tokenen.
	res.status(204).send({ message: "Logged out" });
});

// Posts

app.get("/api/posts", authToken, async (req: AuthRequest, res: Response) => {
	console.log("Get Posts loggas");
	const studentId = req.user!.id;
	try {
		const result = await client.query(
			`SELECT
		posts.id,
		posts.text,
		posts.group_id,
		posts.created_at,
		groups.name AS group_name,
		students.first_name,
		students.last_name,
		students.profile_picture
		FROM posts
		JOIN students ON posts.sender_id = students.id
		JOIN group_members ON posts.group_id = group_members.group_id
		JOIN groups ON posts.group_id = groups.id
		WHERE group_members.student_id = $1
		ORDER BY posts.created_at DESC`,
			[studentId]
		);

		res.status(200).send({ posts: result.rows });
	} catch (error: unknown) {
		console.log("Couldnt get posts", error);
		res.status(500).send({ error: "Vi kunde inte fetcha posterna." });
	}
});

app.post("/api/posts", authToken, async (req: AuthRequest, res: Response) => {
	console.log("Post Post loggas");
	const studentId = req.user!.id;

	if (!studentId) {
		console.log("Ingen cookie");
		res.status(401).send({ error: "Inte inloggad, kan inte posta" });
	} else {
		const { text, group_id } = req.body;
		if (!req.body.group_id) {
			res.status(401).send({ error: "Ingen groupID" });
		} else {
			try {
				await client.query("INSERT INTO posts (sender_id, text, group_id) VALUES ($1,$2,$3)", [studentId, text, group_id]);
				console.log("Post skapad!");
				res.status(201).send({ message: "Post skickad" });
			} catch (error: unknown) {
				console.error(error);
				res.status(500).send({ error: "Något gick fel på servern" });
			}
		}
	}
});

// Schedule
app.get("/api/schedule", authToken, async (req: AuthRequest, res: Response) => {
	console.log("Get Schedule loggas");

	const studentId = req.user!.id;

	try {
		const personalSchedule = await client.query("SELECT weekday, start_time, end_time FROM weekly_schedule WHERE student_id=$1", [studentId]);
		const groupEvents = await client.query(
			`SELECT events.title, events.description, events.weekday, events.start_time, events.end_time
	FROM events
	JOIN group_members ON group_members.group_id = events.group_id
	WHERE group_members.student_id=$1`,
			[studentId]
		);

		const schedule = [
			...personalSchedule.rows.map((row) => ({
				title: "Närvaro",
				weekday: row.weekday,
				start: row.start_time,
				end: row.end_time,
			})),
			...groupEvents.rows.map((row) => ({
				title: row.title,
				weekday: row.weekday,
				start: row.start_time,
				end: row.end_time,
			})),
		];

		res.status(200).send({ schedule });
	} catch (error) {}
});

// Settingup server

app.listen(port, () => {
	console.log("Server is running on http://localhost:" + port);
});
