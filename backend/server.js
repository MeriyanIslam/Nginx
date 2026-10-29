require("dotenv").config();

const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const pool = new Pool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

app.get("/", (req, res) => {
  res.json({ message: "DevOps Assignment API is running" });
});

app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok", database: "connected" });
  } catch (error) {
    console.error("Database health check failed:", error.message);
    res.status(503).json({ status: "error", database: "disconnected" });
  }
});

app.get("/api/time", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW() AS server_time");
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Database query failed" });
  }
});

const port = Number(process.env.PORT || 3000);

app.listen(port, "127.0.0.1", () => {
  console.log(`API listening on 127.0.0.1:${port}`);
});

