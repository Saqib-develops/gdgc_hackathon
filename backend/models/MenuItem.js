const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  ingredients: [String],
  description: String,
  allergens: String,
  pairings: String,
  instagramCaption: String,
  whatsappPromo: String,
  photoUrl: String,
   // NEW FIELDS
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 }
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);
module.exports = MenuItem;
