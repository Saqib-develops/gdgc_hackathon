require('dotenv').config();
const mongoose = require('mongoose');

async function checkDB() {
  try {
    const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/foodieai';
    console.log('Connecting to:', MONGO_URI);
    
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected');

    // List all collections
    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log('\n📂 Collections in database:');
    collections.forEach(col => console.log('  -', col.name));

    // Check each collection's document count
    console.log('\n📊 Document counts:');
    for (const col of collections) {
      const count = await mongoose.connection.db.collection(col.name).countDocuments();
      console.log(`  - ${col.name}: ${count} documents`);
      
      if (count > 0) {
        const sample = await mongoose.connection.db.collection(col.name).findOne();
        console.log(`    Sample:`, JSON.stringify(sample, null, 2));
      }
    }

    // Now check using the MenuItem model
    const MenuItem = require('./models/MenuItem');
    const modelCount = await MenuItem.countDocuments();
    console.log('\n🔍 MenuItem.countDocuments():', modelCount);

    mongoose.connection.close();
  } catch (err) {
    console.error('❌ Error:', err);
  }
}

checkDB();
