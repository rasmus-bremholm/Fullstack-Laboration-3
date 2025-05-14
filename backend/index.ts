// Imports
import express, { response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { Client } from "pg";

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

app.get("/api/:id", async (req, res) => {
	const { rows }: { rows: Student[] } = await client.query("SELECT * FROM students WHERE id=$1", [req.params.id]);
	if (rows.length > 0) {
		res.status(200).send(rows);
	} else {
		res.status(404).send({ message: "Student not found" });
	}
});

app.post("/api/students", async (req, res) => {
	try {
		const result = await client.query("INSERT INTO students (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)", [
			req.body.first_name,
			req.body.last_name,
			req.body.email,
			req.body.password,
		]);
	} catch (error) {
		res.status(500).send({ error: "Gick inte att inserta studenten i databasen" });
	}
});

// Setting upserver

app.listen(port, () => {
	console.log("Server is running on http://localhost:" + port);
});
