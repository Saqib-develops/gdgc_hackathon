require('dotenv').config();
const axios = require('axios');

const API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyCZYiD9FnnYLV2QxHRwlg8O8CuHLhjtN-s';

console.log('Testing API Key:', API_KEY?.slice(0, 10) + '...');
console.log('Full key length:', API_KEY?.length);

// Test with different model names
const models = [
  'gemini-2.5-flash',
  'gemini-1.5-flash',
  'gemini-1.5-pro',
  'gemini-pro'
];

async function testModel(model) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${API_KEY}`;
  
  try {
    const response = await axios.post(url, {
      contents: [{
        parts: [{ text: 'Hello' }]
      }]
    });
    console.log(`✅ ${model}: SUCCESS`);
    return true;
  } catch (err) {
    console.log(`❌ ${model}: ${err.response?.data?.error?.message || err.message}`);
    return false;
  }
}

async function testAll() {
  console.log('\nTesting models...\n');
  for (const model of models) {
    await testModel(model);
  }
}

testAll();
