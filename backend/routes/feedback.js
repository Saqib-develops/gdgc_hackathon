// backend/routes/feedback.js
const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

// ✅ Record user feedback (like/dislike)
router.post("/", async (req, res) => {
  try {
    const { name, liked } = req.body;

    if (!name) return res.status(400).json({ error: "Dish name required" });

    const item = await MenuItem.findOne({ name });
    if (!item) return res.status(404).json({ error: "Dish not found" });

    if (liked) item.likes = (item.likes || 0) + 1;
    else item.dislikes = (item.dislikes || 0) + 1;

    await item.save();

    return res.json({ success: true });
  } catch (err) {
    console.error("Feedback error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;

