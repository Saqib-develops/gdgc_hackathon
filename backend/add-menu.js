require('dotenv').config();
const mongoose = require('mongoose');
const MenuItem = require('./models/MenuItem');

const menuItems = [
  { name: "Paneer Tikka Masala", price: 180, ingredients: ["paneer", "tomato", "cream"], description: "Grilled cottage cheese in creamy tomato gravy" },
  { name: "Butter Chicken", price: 220, ingredients: ["chicken", "butter", "tomato"], description: "Tender chicken in butter tomato sauce" },
  { name: "Dal Makhani", price: 140, ingredients: ["black lentils", "butter"], description: "Slow-cooked black lentils" },
  { name: "Veg Biryani", price: 160, ingredients: ["rice", "vegetables"], description: "Fragrant rice with vegetables" },
  { name: "Chole Bhature", price: 120, ingredients: ["chickpeas", "fried bread"], description: "Spicy chickpea curry with fluffy bread" },
  { name: "Tandoori Roti", price: 30, ingredients: ["wheat flour"], description: "Clay oven baked flatbread" },
  { name: "Garlic Naan", price: 50, ingredients: ["flour", "garlic"], description: "Buttery garlic flatbread" },
];

async function addMenu() {
  const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/foodieai';
  console.log('Connecting to:', MONGO_URI);
  await mongoose.connect(MONGO_URI);
  console.log('✅ Connected to MongoDB');
  
  await MenuItem.insertMany(menuItems);
  console.log(`✅ Added ${menuItems.length} menu items`);
  
  const count = await MenuItem.countDocuments();
  console.log(`📋 Total items in DB: ${count}`);
  
  mongoose.connection.close();
}

addMenu().catch(console.error);
