const express = require("express");
const MenuItem = require("../models/MenuItem");
const router = express.Router();

// Add a new menu item
router.post("/", async (req, res) => {
  try {
    const { name, price, ingredients, description } = req.body;

    const item = new MenuItem({
      name,
      price,
      ingredients: ingredients || [],
      description: description || "",
    });

    await item.save();
    res.json({ success: true, item });
  } catch (err) {
    console.error("Save Menu Item Error:", err);
    res.status(500).json({ success: false, error: "Save failed" });
  }
});

// Get menu items
router.get("/", async (req, res) => {
  const items = await MenuItem.find();
  res.json(items);
});

module.exports = router;

