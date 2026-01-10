# Leveld 🚀  
**AI-Powered Gamified Goal Tracking Platform**

Leveld turns long-term goals into structured, gamified quest trees using AI.  
Users gain XP, unlock levels, and progress visually—like a game, but for real life.

---

## ✨ Features

### 🧠 AI Quest Generation
- Users enter a high-level goal (e.g. *“Become a Full Stack Developer”*)
- AI breaks it down into:
  - Units → Levels → Tasks
- Automatically structured, validated, and persisted

### 🎮 Gamified Progress System
- Task completion grants XP
- Levels unlock sequentially
- Units unlock after completion
- Real-time progress tracking

### 📊 Dashboard
- Total XP
- Active & completed goals
- Progress bars per goal

### 🌳 Quest Tree UI
- Visual unit separation
- Level nodes (locked / active / completed)
- Expandable task lists
- Matches game-like progression UX

### 🔐 Authentication
- JWT-based authentication
- Secure protected routes
- Token persistence on frontend

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Ollama (local LLM for AI quest generation)

### Frontend
- Next.js (App Router)
- React
- TypeScript
- Tailwind CSS
- Axios

### AI
- Ollama (local inference)
- Prompt-controlled structured JSON output
- Backend validation & retry logic

---

## 📁 Monorepo Structure
leveld/
├── apps/
│ ├── backend/ # Express + MongoDB API
│ ├── frontend/ # Next.js frontend
│ └── ai/ # AI / Ollama logic


---

## ⚙️ Environment Variables

### Backend (`apps/backend/.env`)
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret


### AI (`apps/ai/.env`)
OLLAMA_HOST=http://localhost:11434


> ⚠️ `.env` files are ignored from Git.  
Use `.env.example` as reference.

---

## ▶️ Running the Project Locally

### 1️⃣ Start MongoDB
Ensure MongoDB is running locally or via Atlas.

---

### 2️⃣ Start Ollama
```bash
ollama serve
ollama pull mistral


### 3️⃣ Start Backend
cd apps/backend
npm install
npm run dev
Backend runs on:
http://localhost:5000


###4️⃣ Start Frontend
cd apps/frontend
npm install
npm run dev
Frontend runs on:
http://localhost:3000






