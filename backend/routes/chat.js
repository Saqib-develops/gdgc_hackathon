const express = require("express");
const router = express.Router();
const MenuItem = require("../models/MenuItem");
const { callGeminiConversational } = require("../services/geminiClient");

/**
 * POST /api/chat/query
 * Returns structured recommendations with learning mode.
 */
router.post("/query", async (req, res) => {
  try {
    const { message } = req.body;

    // ✅ Fetch menu
    let menu = await MenuItem.find().lean();

    if (!menu.length) {
      return res.json({
        answer: [{
          name: "Menu is empty",
          price: "",
          description: "Add items using Admin Dashboard first.",
          tags: []
        }]
      });
    }

    // ✅ Apply score sorting (Learning Mode)
    menu = menu.sort((a, b) => {
      const scoreA = (a.likes || 0) - (a.dislikes || 0);
      const scoreB = (b.likes || 0) - (b.dislikes || 0);
      return scoreB - scoreA;
    });

    // ✅ Convert to clean structured menu context for AI
    const menuContext = JSON.stringify(
      menu.map(item => ({
        name: item.name,
        price: item.price,
        description: item.description || "",
        score: (item.likes || 0) - (item.dislikes || 0) // <-- Popularity ranking
      })),
      null,
      2
    );

    // ✅ Prompt for structured JSON recommendations
    const prompt = `
You are FoodieAI, a friendly Indian restaurant recommendation buddy 😄

Recommend exactly **3 dishes** from the menu below.
Focus on **high score dishes** — customers like them more.
Avoid low-score dishes unless the user has very limited options.

Return ONLY pure JSON:
[
  {
    "name": "Dish Name",
    "price": 120,
    "description": "very short flavor note",
    "tags": ["veg", "spicy"]
  }
]

Menu (with popularity score):
${menuContext}

User request:
"${message}"
`;

    const ai = await callGeminiConversational(prompt);

    // ✅ Clean output (remove ```json formatting if present)
    let raw = (ai.output || "").trim();
    raw = raw.replace(/```json/gi, "").replace(/```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(raw);
    } catch (err) {
      console.log("⚠️ JSON Parse Failed. Raw Output →", raw);
      return res.json({
        answer: [{
          name: "AI Response Error",
          description: "The AI returned text instead of JSON. Try again.",
          price: "",
          tags: []
        }]
      });
    }

    return res.json({ answer: parsed });

  } catch (err) {
    console.error("🔥 Chat error:", err);
    return res.status(500).json({
      answer: [{
        name: "Server Error",
        price: "",
        description: "Something went wrong.",
        tags: []
      }]
    });
  }
});

router.post("/", (req, res) => {
  res.status(200).json({ note: "Use /api/chat/query instead." });
});

module.exports = router;



