const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");

router.get("/", async (req, res) => {
  const menu = await MenuItem.find().lean();

  const top = [...menu].sort((a,b) => ((b.likes||0)-(b.dislikes||0)) - ((a.likes||0)-(a.dislikes||0))).slice(0,3);
  const bottom = [...menu].sort((a,b) => ((a.likes||0)-(a.dislikes||0)) - ((b.likes||0)-(b.dislikes||0))).slice(0,3);

  res.json({
    totalItems: menu.length,
    mostLoved: top,
    mostDisliked: bottom
  });
});

module.exports = router;
