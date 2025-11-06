# 🍽️ FoodieAI MVP

**AI-powered restaurant menu management and customer chat system** built with React, Node.js, Express, MongoDB, and Google Gemini AI.

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Usage Guide](#usage-guide)
- [Troubleshooting](#troubleshooting)

---

## ✨ Features

### Admin Dashboard
- 📝 **AI-Generated Menu Content**: Upload dish photos and basic details, get AI-generated descriptions, allergen info, pairings, and social media captions
- 📸 **Image Upload & Preview**: Upload and preview dish images
- 🍴 **Menu Management**: Create, edit, and delete menu items
- 🤖 **Powered by Google Gemini AI**: Vision API for image analysis and conversational AI for content generation

### Customer Chat Interface
- 💬 **Smart Recommendations**: Ask for dish suggestions based on preferences (vegetarian, budget, spice level, etc.)
- 🎯 **Context-Aware**: AI suggests dishes from actual menu with prices and descriptions
- 🏷️ **Tagged Suggestions**: Get dietary tags (veg, spicy, tandoori, etc.) with each recommendation
- 📱 **Clean UI**: Modern card-based interface with dish details

### Analytics & Feedback
- 📊 **Menu Analytics**: Track likes/dislikes for each dish
- 💬 **Customer Feedback**: Collect and view customer feedback

---

## 🛠️ Tech Stack

### Frontend
- **React** 18.3.1 - UI library
- **React Router DOM** 6.30.1 - Client-side routing
- **Axios** - HTTP client
- **Vite** - Build tool and dev server

### Backend
- **Node.js** with Express 4.18.2 - Server framework
- **MongoDB** with Mongoose 7.0.0 - Database
- **Google Gemini AI** - AI content generation and vision
- **Multer** 2.0.0 - File upload handling
- **Axios** - API calls to Gemini
- **CORS** - Cross-origin resource sharing
- **Dotenv** - Environment variables

---

## 📁 Project Structure

```
foodieai-mvp/
├── backend/
│   ├── models/
│   │   └── MenuItem.js          # MongoDB schema for menu items
│   ├── routes/
│   │   ├── admin.js             # Admin AI generation endpoints
│   │   ├── chat.js              # Customer chat endpoints
│   │   ├── menu.js              # CRUD operations for menu
│   │   ├── feedback.js          # Feedback collection
│   │   └── analytics.js         # Analytics endpoints
│   ├── services/
│   │   └── geminiClient.js      # Google Gemini AI integration
│   ├── .env                     # Environment variables (create this)
│   ├── server.js                # Main server file
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx              # Landing page
│   │   │   ├── AdminDashboard.jsx    # Admin interface
│   │   │   └── CustomerChat.jsx      # Customer chat interface
│   │   ├── App.jsx              # Main app component with routing
│   │   └── main.jsx             # React entry point
│   ├── vite.config.js           # Vite configuration
│   └── package.json
│
└── README.md
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - Either:
  - Local: [Download MongoDB Community](https://www.mongodb.com/try/download/community)
  - Cloud: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (free tier available)
- **Google Gemini API Key** - [Get it here](https://aistudio.google.com/app/apikey)

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd foodieai-mvp
```

### 2. Install Backend Dependencies
```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies
```bash
cd ../frontend
npm install
```

---

## ⚙️ Configuration

### Backend Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cd backend
touch .env  # or manually create the file
```

Add the following variables:

```env
PORT=8080
MONGO_URI=mongodb://127.0.0.1:27017/foodieai
GEMINI_API_KEY=your_gemini_api_key_here
TEXT_MODEL_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent
VISION_MODEL_URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent
```

#### For MongoDB Atlas (Cloud):
Replace `MONGO_URI` with your Atlas connection string:
```env
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/foodieai?retryWrites=true&w=majority
```

### Frontend Configuration

The frontend uses Vite's proxy to connect to the backend. Configuration is in `frontend/vite.config.js`:

```javascript
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8080'
    }
  }
})
```

---

## 🏃 Running the Application

### Option 1: Run Backend and Frontend Separately

#### Start MongoDB (if local)
```bash
# Windows
mongod

# Mac/Linux
sudo mongod
```

#### Start Backend
```bash
cd backend
npm run dev
# Server runs on http://localhost:8080
```

#### Start Frontend (in a new terminal)
```bash
cd frontend
npm run dev
# Frontend runs on http://localhost:5173
```

### Option 2: Production Build

```bash
# Build frontend
cd frontend
npm run build

# Serve from backend
cd ../backend
NODE_ENV=production npm start
```

---

## 🔌 API Endpoints

### Menu Management
- `GET /api/menu` - Get all menu items
- `POST /api/menu` - Create a new menu item
- `DELETE /api/menu/:id` - Delete a menu item

### Admin AI Generation
- `POST /api/admin/generate` - Generate AI content for a dish
  - **Body**: FormData with `name`, `price`, `ingredients`, `photo` (optional)
  - **Returns**: JSON with `menuBlurb`, `allergens`, `pairings`, `instagramCaption`, `whatsappPromo`

### Customer Chat
- `POST /api/chat/query` - Get dish recommendations
  - **Body**: `{ message: "I want vegetarian food under ₹150" }`
  - **Returns**: Array of suggested dishes with name, price, description, tags

### Analytics & Feedback
- `POST /api/feedback` - Submit customer feedback
- `GET /api/analytics` - Get menu analytics (likes/dislikes)

---

## 📖 Usage Guide

### For Restaurant Admins

1. **Navigate to Admin Dashboard**: `http://localhost:5173/admin`

2. **Add a New Menu Item**:
   - Enter dish name, price, and ingredients (comma-separated, e.g., "beef paste, refined wheat, eggs, oil")
   - Optionally upload a dish photo
   - Click "⚡ Generate AI Description"
   - Review and edit the AI-generated content
   - Click "✅ Save to Menu"

3. **Manage Menu Items**:
   - View all menu items in the list below
   - Delete items using the "Delete" button

### For Customers

1. **Navigate to Customer Chat**: `http://localhost:5173/chat`

2. **Ask for Recommendations**:
   - Examples:
     - "I want vegetarian food under ₹150"
     - "Suggest something spicy"
     - "What's good for lunch around ₹200?"
     - "Show me dairy-free options"

3. **View Suggestions**:
   - Get 3 AI-recommended dishes from the actual menu
   - See price, description, and dietary tags
   - Click "Add to Order" (placeholder for future feature)

---

## 🐛 Troubleshooting

### Backend Issues

**"Cannot connect to MongoDB"**
- Ensure MongoDB is running: `mongod` (local) or check MongoDB Atlas connection string
- Verify `MONGO_URI` in `.env` file

**"GEMINI_API_KEY is not set"**
- Check `.env` file exists in `backend` directory
- Verify API key is valid at https://aistudio.google.com/app/apikey

**"AI unavailable right now"**
- Check backend logs for Gemini API errors
- Verify API key is correct and has quota remaining
- Ensure model name is correct: `gemini-2.5-flash`
- Restart the backend server after updating `.env`

**"Menu items found: 0"**
- Database is empty. Add menu items via Admin Dashboard or run seed script (see below)

### Frontend Issues

**"Network Error" or "Failed to fetch"**
- Ensure backend is running on port 8080
- Check Vite proxy configuration in `vite.config.js`

**"No recommendations found"**
- Ensure menu items exist in the database
- Check backend terminal for errors

**Broken UI in Admin Dashboard**
- Clear browser cache and reload
- Check browser console for JavaScript errors

### Seeding Sample Data

To add sample menu items:

```bash
cd backend
node add-menu.js
```

This adds 7 sample Indian dishes to the database.

---

## 🔐 Security Notes

- **Never commit `.env` file** to version control
- Keep your `GEMINI_API_KEY` private
- For production, use environment variables from your hosting platform
- MongoDB Atlas credentials should be kept secure
- Add `.env` to `.gitignore`:
  ```
  # .gitignore
  node_modules/
  .env
  dist/
  ```

---

## 📄 License

This project is for educational/demonstration purposes.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Open a Pull Request

---

## 📞 Support

For issues or questions:
- Check the [Troubleshooting](#troubleshooting) section
- Open an issue on GitHub
- Review backend console logs for detailed error messages

---

## 🎯 Future Enhancements

- Order management system
- Payment integration
- Customer authentication
- Real-time order tracking
- Multi-language support
- Restaurant table booking
- Delivery integration

---

**Built with ❤️ using React, Node.js, MongoDB, and Google Gemini AI**
