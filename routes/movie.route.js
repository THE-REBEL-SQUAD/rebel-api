const express = require("express");
const router = express.Router();
const axios = require("axios");
const { register } = require("../utils/routeRegistry");

register("GET", "/movie?name=Inception", "🎬 Movie info (TMDB)");

router.get("/movie", async (req, res) => {
  const name = req.query.name;
  if (!name) return res.status(400).json({ error: "Use ?name=" });

  const url = `https://api.themoviedb.org/3/search/movie?api_key=${keys.tmdb}&query=${encodeURIComponent(name)}`;
  const r = await axios.get(url);

  res.json(r.data.results[0] || {});
});

module.exports = router;
