const axios = require("axios");
require("dotenv").config(); // Make sure .env is loaded

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  console.error("❌ GEMINI_API_KEY missing in .env");
  process.exit(1);
}

console.log("✅ Gemini Key Loaded:", GEMINI_API_KEY.slice(0, 6) + "...");

// ✅ Use valid model:
const MODEL = "gemini-2.5-flash";

const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

// 🧠 Text Conversation
async function callGeminiConversational(prompt) {
  try {
    const response = await axios.post(
      API_URL,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const text =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "No response.";
    return { output: text, raw: response.data };

  } catch (err) {
    console.error("🔥 Gemini API ERROR:", err.response?.data || err.message);
    return { output: "AI unavailable right now.", raw: null };
  }
}

// 🖼️ Vision (Photo → Description)
async function callGeminiVision(imageBuffer, mimeType = "image/jpeg") {
  try {
    const base64Image = imageBuffer.toString("base64");

    const response = await axios.post(
      API_URL,
      {
        contents: [
          {
            parts: [
              { text: "Describe this food dish shortly (Indian menu style)." },
              { inlineData: { mimeType, data: base64Image } }
            ]
          }
        ]
      },
      { headers: { "Content-Type": "application/json" } }
    );

    const text =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() ||
      "No description.";
    return { description: text };

  } catch (err) {
    console.error("🔥 Gemini Vision ERROR:", err.response?.data || err.message);
    return { description: "Vision unavailable." };
  }
}

module.exports = { callGeminiConversational, callGeminiVision };



