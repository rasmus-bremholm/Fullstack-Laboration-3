// Imports
import express, { response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { Client, QueryResult } from "pg";

/*
	Frågor till Vanja/Jon handledning.

	Nu har jag fixat min databas som jag tror ska fungera.
	Nu hamnar jag i en situation där på min profilsida till exempel behöver ha tillgång till många bord.
	Istället för att skapa flera routes, hur ska jag kombinera flera queries och baka ihop det till ett resultat.

	Exempel 1 )
	Vi behöver på profilsidan åtkomst till all information om eleven, samt info om schema och grupper.
	Men jag skulle väl egentligen göra 1 fetch med mycket data snarare än 4 fetchar som i mitt förra.
	Samma problem ifall jag vill uppdatera gruppen på en user, en ny fetch till en ny route eller?

	Jag försökte att skapa en till const { rows } = await client, men det löser sig inte med typen. Är nog inte helt införstådd över hur
	rows används.
*/

/*
	TODO:
	- Fixa datan som returneras. (schema, user, groups)
	- Fixa "avatar" bilden i databasen.

*/

// Global Variables
const port = process.env.PORT || 1338;

// Initialisation
const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(cors());
dotenv.config();
const client = new Client({
	connectionString: process.env.PGURI,
});
client.connect();

// Interfaces
interface Student {
	id: number;
	first_name: string;
	last_name: string;
	email: string;
	password: string;
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
		const result: QueryResult = await client.query("INSERT INTO students (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)", [
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

app.put("/api/students/:id", async (req, res) => {
	const studentId = parseInt(req.params.id);
	if (isNaN(studentId)) {
		res.status(400).send({ error: "Id needs to be a number" });
	}
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

// Setting upserver

app.listen(port, () => {
	console.log("Server is running on http://localhost:" + port);
});
