const express = require("express");
const app = express();

app.use(express.json());

// -------- HEALTH --------
app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "REBEL API RUNNING (VERCEL SAFE)"
  });
});

// -------- ROUTE LIST --------
const routes = [
  { path: "/ping", method: "GET" },
  { path: "/api/bin?bin=457173", method: "GET" },
  { path: "/api/shorten?url=https://google.com", method: "GET" }
];

app.get("/__routes", (req, res) => {
  res.json({
    success: true,
    total: routes.length,
    routes
  });
});

// -------- PING --------
app.get("/ping", (req, res) => {
  res.json({ pong: true });
});

// -------- BIN (SAFE) --------
app.get("/api/bin", async (req, res) => {
  res.json({
    bin: req.query.bin || null,
    country: "Demo",
    status: "OK"
  });
});

// -------- SHORTENER (SAFE) --------
app.get("/api/shorten", async (req, res) => {
  res.json({
    long: req.query.url || null,
    short: "https://is.gd/demo"
  });
});

module.exports = app; // 🔴 MUST
