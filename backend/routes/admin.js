const express = require('express');
const multer = require('multer');
const router = express.Router();
const { callGeminiVision, callGeminiConversational } = require('../services/geminiClient');

const upload = multer();

// POST /api/admin/generate
router.post('/generate', upload.single('photo'), async (req, res) => {
  try {
    const { name, price, ingredients } = req.body;
    let vision = { description: '' };
    if (req.file && req.file.buffer) {
      vision = await callGeminiVision(req.file.buffer);
    }

    const prompt = `You are a menu content writer for an Indian restaurant.

Dish: ${name}
Price: ₹${price}
Ingredients: ${ingredients}
Image description: ${vision.description}

Generate content in the following JSON format ONLY (no markdown, no extra text):
{
  "menuBlurb": "A short 1-2 sentence appetizing description for the menu",
  "allergens": "List of allergens (e.g., dairy, nuts, gluten)",
  "pairings": "What goes well with this dish (e.g., raita, naan)",
  "instagramCaption": "A catchy Instagram caption with emojis",
  "whatsappPromo": "A promotional message for WhatsApp (1-2 lines)"
}`;

    const ai = await callGeminiConversational(prompt);
    
    // Parse the JSON response
    let parsed;
    try {
      const cleaned = ai.output.replace(/```json|```/gi, '').trim();
      parsed = JSON.parse(cleaned);
    } catch (e) {
      console.error('JSON parse error:', e);
      // Fallback with raw text
      parsed = {
        menuBlurb: ai.output,
        allergens: '',
        pairings: '',
        instagramCaption: '',
        whatsappPromo: ''
      };
    }

    res.json({ ai: parsed, vision });
  } catch (err) {
    console.error('Admin generate error:', err);
    res.status(500).json({ error: 'Generation failed' });
  }
});

module.exports = router;
