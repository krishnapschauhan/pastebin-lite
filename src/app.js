import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import pastesRouter from "./routes/pastes.routes.js";

dotenv.config();

const app = express();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

app.get("/api/healthz", (req, res) => {
  res.status(200).json({ ok: true });
});

app.use("/api/pastes", pastesRouter);


app.get("/new", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new.html"));
});

app.get("/p/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "paste.html"));
});

app.get("/", (req, res) => {
  res.json({ message: "Pastebin Lite API" });
});

export default app;
