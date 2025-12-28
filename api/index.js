const express = require("express");
const path = require("path");
const cors = require("cors");
const helmet = require("helmet");
const { loadKeys } = require("../config/keys");

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.static(path.join(process.cwd(), "public")));

let loaded = false;
app.use(async (req, res, next) => {
  if (!loaded) {
    try {
      await loadKeys();
      loaded = true;
    } catch (e) {
      console.error("Key load failed:", e.message);
    }
  }
  next();
});

// ONLY SAFE ROUTES
app.use(require("../routes/system.route"));
app.use(require("../routes/movie.route"));

app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public/index.html"));
});

module.exports = app;
