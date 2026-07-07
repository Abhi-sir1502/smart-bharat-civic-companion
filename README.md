# Smart Bharat – AI-Powered Civic Companion

A GenAI-powered civic platform that helps citizens understand government schemes, check required documents, report civic issues, and track complaints — with Hindi/English support.

## Features
- 🤖 AI Chatbot (Gemini API) — answers questions about PM Awas Yojana, Ayushman Bharat, Scholarships, Pension, and general civic queries
- 📄 Government Schemes page with eligibility + document checklist
- 🛣️ Civic issue reporting (road, streetlight, garbage, water supply)
- 📍 Complaint tracking (mock/demo status progression)
- 🌐 Hindi + English toggle

## Tech Stack
- Frontend: HTML + Tailwind CSS (CDN) + Vanilla JS
- Backend: Node.js + Express
- AI: Google Gemini API

## Setup

### Backend
```bash
cd backend
npm install
cp .env.example .env
# Add your Gemini API key inside .env
npm start
```
Backend runs on `http://localhost:5000`

### Frontend
Just open `frontend/index.html` in a browser, or serve it:
```bash
cd frontend
npx serve .
```
Make sure `API_BASE` at the top of `index.html`'s script points to your backend URL (localhost or deployed URL).

## Deployment Suggestion
- Backend: Render / Railway (free tier)
- Frontend: Vercel / Netlify / GitHub Pages

## Team
Built for PromptWars / Smart Bharat Challenge.
