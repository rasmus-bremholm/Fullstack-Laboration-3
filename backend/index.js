"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
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
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        }
        else {
            callback(new Error("Cors funkade inte"));
        }
    },
    credentials: true,
}));
dotenv_1.default.config();
const client = new pg_1.Client({
    connectionString: process.env.PGURI,
});
client.connect();
// Helper functions
const getUserIdFromCookies = (req) => {
    const token = req.cookies.token;
    const userId = parseInt(token);
    if (isNaN(userId)) {
        return null;
    }
    else {
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
app.get("/api/students", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hej");
    const { rows } = yield client.query("SELECT * FROM students");
    res.status(200).send(rows);
}));
// Ok denna routen är den ultimata final bossen ifall min cookie auth fungerar.
// Väldigt lik students/id fast nu läser jag enbart från cookies för att få mitt id. Vilket betyder att vi måste vara inloggade.
app.get("/api/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.token;
    const studentId = parseInt(token);
    if (isNaN(studentId)) {
        res.status(400).send({ error: "Ingen giltig token" });
    }
    try {
        const student = yield client.query("SELECT * FROM students WHERE id=$1", [studentId]);
        const schedule = yield client.query("SELECT weekday, start_time, end_time FROM weekly_schedule WHERE student_id=$1", [studentId]);
        const groups = yield client.query("SELECT groups.id, groups.name, groups.description FROM group_members JOIN groups ON groups.id = group_members.group_id WHERE group_members.student_id=$1", [studentId]);
        const events = yield client.query("SELECT events.* FROM events JOIN group_members ON events.group_id = group_members.group_id WHERE group_members.student_id=$1", [studentId]);
        res.status(200).send({ student: student.rows[0], schedule: schedule.rows, groups: groups.rows, events: events.rows });
        //console.log(student, schedule, groups, events);
    }
    catch (error) {
        res.status(500).send({ error: "Something went wrong, stupid" });
    }
}));
app.get("/api/students/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = parseInt(req.params.id);
    if (isNaN(studentId)) {
        res.status(400).send({ error: "Id needs to be a number" });
    }
    try {
        const student = yield client.query("SELECT * FROM students WHERE id=$1", [studentId]);
        const schedule = yield client.query("SELECT weekday, start_time, end_time FROM weekly_schedule WHERE student_id=$1", [studentId]);
        const groups = yield client.query("SELECT groups.id, groups.name, groups.description FROM group_members JOIN groups ON groups.id = group_members.group_id WHERE group_members.student_id=$1", [studentId]);
        const events = yield client.query("SELECT events.* FROM events JOIN group_members ON events.group_id = group_members.group_id WHERE group_members.student_id=$1", [studentId]);
        res.status(200).send({ student: student.rows[0], schedule: schedule.rows, groups: groups.rows, events: events.rows });
        console.log(student, schedule, groups, events);
    }
    catch (error) {
        res.status(500).json({ error: "Something went wrong, stupid" });
    }
}));
app.post("/api/students", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield client.query("INSERT INTO students (first_name, last_name, email, password, profile_picture) VALUES ($1, $2, $3, $4, $5)", [req.body.first_name, req.body.last_name, req.body.email, req.body.password, req.body.profile_picture]);
        if ((result === null || result === void 0 ? void 0 : result.rowCount) && result.rowCount > 0) {
            // Sucess
            res.status(201).send({ message: "Student created" });
        }
        else {
            // Fail
            res.status(400).send({ error: "Student couldnt be inserted" });
        }
    }
    catch (error) {
        res.status(500).send({ error: "Couldnt insert student into database" });
    }
}));
app.put("/api/students/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = parseInt(req.params.id);
    if (isNaN(studentId)) {
        res.status(400).send({ error: "Id needs to be a number" });
    }
    try {
        const result = yield client.query("UPDATE students SET first_name=$2, last_name=$3, email=$4, password=$5, profile_picture=$6 WHERE id=$1", [studentId, req.body.first_name, req.body.last_name, req.body.email, req.body.password, req.body.profile_picture]);
        if (result.rowCount && result.rowCount > 0) {
            res.status(200).send({ message: "Updated student information" });
        }
    }
    catch (error) {
        res.status(500).send({ error: "Couldnt update student" });
    }
}));
app.delete("/api/students/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = parseInt(req.params.id);
    if (isNaN(studentId)) {
        res.status(400).send({ error: "Id needs to be a number" });
    }
    try {
        const result = yield client.query("DELETE FROM students WHERE id=$1", [studentId]);
        if (result.rowCount && result.rowCount > 0) {
            res.status(204).send({ message: "Student Deleted" });
        }
    }
    catch (error) {
        res.status(500).send({ error: "Couldnt delete student" });
    }
}));
// Groups
app.get("/api/groups", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Get Groups loggas");
    const token = req.cookies.token;
    const studentId = parseInt(token);
    if (isNaN(studentId)) {
        res.status(401).send({ error: "Ingen/ogiltilg token" });
    }
    try {
        const result = yield client.query("SELECT groups.id, groups.name, groups.description FROM group_members JOIN groups ON group_members.group_id = groups.id WHERE group_members.student_id = $1", [studentId]);
        res.status(200).send({ groups: result.rows });
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: "Failed to get groups" });
    }
}));
// Login
app.post("/api/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Post Login");
    console.log("Login info sent to server: ", req.body);
    try {
        const { email, password } = req.body;
        const result = yield client.query("SELECT * FROM students WHERE email=$1", [email]);
        const user = result.rows[0];
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
    }
    catch (error) {
        console.log("Login Error", error);
        res.status(500).send({ error: "Something went wrong" });
    }
}));
app.post("/api/logout", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Logout
    res.clearCookie("token");
    res.status(204).send({ message: "Logged out" });
}));
// Posts
app.get("/api/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Get Posts loggas");
    try {
        const token = req.cookies.token;
        const studentId = parseInt(token);
        console.log("Student ID Innan", studentId);
        if (isNaN(studentId)) {
            res.status(401).send({ error: "Ingen/ogiltilg token" });
        }
        console.log("Student ID Efter", studentId);
        const result = yield client.query("SELECT posts.id, posts.text, posts.group_id, students.first_name, students.last_name FROM posts JOIN students ON posts.sender_id = students.id JOIN group_members ON posts.group_id = group_members.group_id WHERE group_members.student_id=$1", [studentId]);
        console.log(result.rows);
        res.status(200).send({ posts: result.rows });
    }
    catch (error) {
        console.log("Couldnt get posts", error);
        res.status(500).send({ error: "Vi kunde inte fetcha posterna." });
    }
}));
app.post("/api/posts", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("Post Post loggas");
    const token = req.cookies.token;
    const senderId = parseInt(token);
    if (!senderId) {
        console.log("Ingen cookie");
        res.status(401).send({ error: "Inte inloggad, kan inte posta" });
    }
    else {
        const { text, group_id } = req.body;
        try {
            yield client.query("INSERT INTO posts (sender_id, text, group_id) VALUES ($1,$2,$3)", [senderId, text, group_id]);
            console.log("Post skapad!");
            res.status(201).send({ message: "Post skickad" });
        }
        catch (error) {
            console.error(error);
            res.status(500).send({ error: "Något gick fel på servern" });
        }
    }
}));
// Settingup server
app.listen(port, () => {
    console.log("Server is running on http://localhost:" + port);
});
