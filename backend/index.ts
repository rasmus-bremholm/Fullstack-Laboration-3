// Imports
import express, { response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { Client } from "pg";

// Global Variables
const port = process.env.PORT || 1337;

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

// Routes

app.get("/", (req, res) => {
	res.json({ message: "Hello There" });
});

// Setting upserver

app.listen(port, () => {
	console.log("Server is running on http://localhost:" + port);
});
