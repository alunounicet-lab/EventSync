// Entrada serverless da Vercel. O Express Router é reutilizado pela API local.
import express from "express";
import cors from "cors";
import api from "../src/app.js";

const app = express();
app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use("/api", api);
export default app;
