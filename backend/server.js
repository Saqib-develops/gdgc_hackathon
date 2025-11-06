require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Import routes
const chatRouter = require('./routes/chat');
const adminRouter = require('./routes/admin');
const menuRouter = require('./routes/menu');

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
try {
  app.use('/api/chat', chatRouter);
  console.log('✅ Chat router loaded');
} catch (e) {
  console.error('❌ Chat router failed:', e.message);
}

try {
  app.use('/api/admin', adminRouter);
  console.log('✅ Admin router loaded');
} catch (e) {
  console.error('❌ Admin router failed:', e.message);
}

try {
  app.use('/api/menu', menuRouter);
  console.log('✅ Menu router loaded');
} catch (e) {
  console.error('❌ Menu router failed:', e.message);
}

// MongoDB Connection
const MONGO = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/foodieai';

mongoose.connect(MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Mongo connected successfully'))
.catch(err => console.error('❌ Mongo connection failed:', err.message));

// Serve frontend (optional)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
  });
}

// Start Server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

app.use("/api/feedback", require("./routes/feedback"));
app.use("/api/analytics", require("./routes/analytics"));


