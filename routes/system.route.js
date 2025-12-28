const express = require("express");
const router = express.Router();
const { getRoutes } = require("../utils/routeRegistry");

// ===============================
// All routes list
// ===============================
router.get("/__routes", (req, res) => {
  res.json({
    success: true,
    total: getRoutes().length,
    routes: getRoutes()
  });
});

// ===============================
// Health check (Vercel safe)
// ===============================
router.get("/__health", (req, res) => {
  const path = req.query.path;

  if (!path) {
    return res.json({ ok: false });
  }

  // ❌ Vercel এ self HTTP call করা যাবে না
  // ✅ Registered route থাকলেই alive ধরা হবে

  const exists = getRoutes().some(r =>
    path.startsWith(r.path.split("?")[0])
  );

  res.json({ ok: exists });
});

module.exports = router;
