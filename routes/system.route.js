const express = require("express");
const router = express.Router();
const { getRoutes } = require("../utils/routeRegistry");
const fetch = require("node-fetch");

// all routes list
router.get("/__routes", (req, res) => {
  res.json({
    success: true,
    total: getRoutes().length,
    routes: getRoutes()
  });
});

// health check
router.get("/__health", async (req, res) => {
  const path = req.query.path;
  if (!path) return res.json({ ok: false });

  try {
    const r = await fetch(req.protocol + "://" + req.get("host") + path);
    res.json({ ok: r.ok });
  } catch {
    res.json({ ok: false });
  }
});

module.exports = router;
