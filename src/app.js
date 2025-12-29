import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import pastesRouter from "./routes/pastes.routes.js";

dotenv.config();

const app = express();

// ESM __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

/* ======================
   API ROUTES
   ====================== */

app.get("/api/healthz", (req, res) => {
  res.status(200).json({ ok: true });
});

app.use("/api/pastes", pastesRouter);

/* ======================
   FRONTEND ROUTES
   ====================== */

// Create new paste page (STATIC FIRST)
app.get("/new", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new.html"));
});

// View paste page (DYNAMIC AFTER)
app.get("/p/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "paste.html"));
});

// Root
app.get("/", (req, res) => {
  res.json({ message: "Pastebin Lite API" });
});

/* ======================
   SERVER
   ====================== */

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
