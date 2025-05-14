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
// Global Variables
const port = process.env.PORT || 1338;
// Initialisation
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use((0, cors_1.default)());
dotenv_1.default.config();
const client = new pg_1.Client({
    connectionString: process.env.PGURI,
});
client.connect();
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
app.get("/api/students/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const studentId = parseInt(req.params.id);
    if (isNaN(studentId)) {
        res.status(400).send({ error: "Id needs to be a number" });
    }
    const { rows } = yield client.query("SELECT * FROM students WHERE id=$1", [req.params.id]);
    if (rows.length > 0) {
        res.status(200).send(rows);
    }
    else {
        res.status(404).send({ message: "Student not found" });
    }
}));
app.post("/api/students", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield client.query("INSERT INTO students (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)", [
            req.body.first_name,
            req.body.last_name,
            req.body.email,
            req.body.password,
        ]);
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
app.delete("/api/student/:id", (req, res) => {
    const studentId = parseInt(req.params.id);
    if (isNaN(studentId)) {
        res.status(400).send({ error: "Id needs to be a number" });
    }
    try {
    }
    catch (error) { }
});
// Setting upserver
app.listen(port, () => {
    console.log("Server is running on http://localhost:" + port);
});
