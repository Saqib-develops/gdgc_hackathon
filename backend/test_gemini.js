require("dotenv").config();
const { callGeminiConversational } = require("./services/geminiClient");

(async () => {
  try {
    const result = await callGeminiConversational("Say 'Testing Gemini API' in one short sentence.");
    console.log("✅ AI Response:", result.output);
  } catch (err) {
    console.error("❌ API Test Failed:", err.response?.data || err.message);
  }
})();
