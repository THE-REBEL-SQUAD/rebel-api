const express = require("express");
const router = express.Router();
const { getRoutes } = require("../utils/routeRegistry");

router.get("/__routes", (req, res) => {
  res.json({
    success: true,
    routes: getRoutes()
  });
});

router.get("/__health", (req, res) => {
  const path = req.query.path;
  if (!path) return res.json({ ok: false });

  const exists = getRoutes().some(r =>
    path.startsWith(r.path.split("?")[0])
  );

  res.json({ ok: exists });
});

module.exports = router;
