const express = require("express");
const axios = require("axios");
const router = express.Router();
const { register } = require("../utils/routeRegistry");

register("GET", "/api/bin?bin=457173", "💳 BIN lookup");

router.get("/api/bin", async (req, res) => {
  if (!req.query.bin)
    return res.status(400).json({ error: "BIN required" });

  try {
    const r = await axios.get(
      `https://bin-ip-checker.p.rapidapi.com/?bin=${req.query.bin}`,
      {
        headers: {
          "x-rapidapi-host": "bin-ip-checker.p.rapidapi.com",
          "x-rapidapi-key": global.keys.RAPIDAPI_KEY
        }
      }
    );
    res.json(r.data);
  } catch {
    res.status(500).json({ error: "BIN lookup failed" });
  }
});

module.exports = router;
