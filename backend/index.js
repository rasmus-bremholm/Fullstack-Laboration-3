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
// Routes
app.get("/", (req, res) => {
    res.send({ message: "Hello There" });
});
app.get("/api/users", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hej");
    const { rows } = yield client.query("SELECT * FROM users");
    console.log(rows);
    res.status(200).send(rows);
}));
// Setting upserver
app.listen(port, () => {
    console.log("Server is running on http://localhost:" + port);
});
