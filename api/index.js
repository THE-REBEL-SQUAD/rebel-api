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
    await loadKeys();
    loaded = true;
  }
  next();
});

// routes
app.use(require("../routes/movie.route"));
app.use(require("../routes/system.route"));

// dashboard
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "public/index.html"));
});

module.exports = app;
