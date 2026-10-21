import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import api from "./src/app.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use("/api", api);
app.use(express.static(path.join(__dirname, "public")));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Eventos Conecta disponível em http://localhost:${port}`));
