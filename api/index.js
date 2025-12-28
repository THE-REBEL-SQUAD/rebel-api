const express = require("express");
const path = require("path");

const app = express();
app.use(express.json());

// Static HTML
app.use(express.static(path.join(process.cwd(), "public")));

// Routes
app.use("/", require("../routes/health.route"));
app.use("/", require("../routes/routes.route"));
app.use("/api/shorten", require("../routes/shorten.route"));
app.use("/api/bin", require("../routes/bin.route"));
app.use("/api/movie", require("../routes/movie.route"));
app.use("/api/anime", require("../routes/anime.route"));

module.exports = app; // 🔴 MUST for Vercel
