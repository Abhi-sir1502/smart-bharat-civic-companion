# 🇮🇳 Smart Bharat – AI-Powered Civic Companion

> A GenAI-powered civic platform that helps citizens access government services, report public issues, and get personalized assistance through an intelligent AI companion.

## 🔗 Live Links

- *🌐 Live Demo:* [https://smart-bharat-civic-companion.vercel.app/](https://smart-bharat-civic-companion.vercel.app/)
- *⚙️ Backend API:* Hosted on Render
- *💻 GitHub Repo:* [https://github.com/Abhi-sir1502/smart-bharat-civic-companion](https://github.com/Abhi-sir1502/smart-bharat-civic-companion)

## 🎯 Problem & Reason for This Solution

Most Indian citizens, especially in rural and semi-urban areas, struggle to understand government schemes, don't know which documents are needed for a service, and have no easy way to report or track civic issues like broken roads or streetlights. Government information is often scattered, complex, and available mostly in English — creating a barrier for millions.

*Smart Bharat solves this by:*
- Using *Generative AI (Gemini)* to explain schemes and answer questions in plain, simple Hindi or English
- Listing *exact document requirements* for major schemes (PM Awas Yojana, Ayushman Bharat, Scholarships, Pension)
- Giving citizens a simple way to *report civic issues* and *track complaint status*
- Supporting *multilingual interaction* to improve accessibility and digital inclusion

This directly addresses the challenge's goal: making everyday civic interactions *faster, smarter, and more transparent* using AI.

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 AI Chatbot | Powered by Gemini API — answers civic/government queries in natural language |
| 📄 Government Schemes | Structured info on PM Awas Yojana, Ayushman Bharat, Scholarships, Pension |
| 📋 Document Checklist | Required documents listed for every scheme |
| 🛣️ Issue Reporting | Report road damage, streetlight, garbage, water supply issues |
| 📍 Complaint Tracking | Track complaint status using a unique Complaint ID |
| 🌐 Multilingual | Hindi + English toggle across chatbot and schemes |

## 🛠️ Tech Stack

- *Frontend:* HTML, Tailwind CSS, Vanilla JS — deployed on *Vercel*
- *Backend:* Node.js + Express — deployed on *Render*
- *AI:* Google Gemini API (gemini-2.5-flash)

## 🚀 Local Setup

bash
# Backend
cd backend
npm install
cp .env.example .env   # add your GEMINI_API_KEY
npm start

# Frontend
# just open frontend/index.html in a browser
# or update API_BASE in index.html to your backend URL


## 📸 Screenshots
<img width="1365" height="631" alt="Screenshot 2026-07-07 125509" src="https://github.com/user-attachments/assets/4eb31857-c41c-41b0-8af0-f784be893fc8" />
<img width="1365" height="633" alt="Screenshot 2026-07-07 125523" src="https://github.com/user-attachments/assets/664de48a-308d-432b-8517-75e475af1e3e" />
<img width="1365" height="631" alt="Screenshot 2026-07-07 125643" src="https://github.com/user-attachments/assets/a7729853-b13d-47fe-bac0-d05ce1c1d653" />
<img width="1365" height="628" alt="Screenshot 2026-07-07 125704" src="https://github.com/user-attachments/assets/20394a7b-7799-4535-8338-a6dfbefbca56" />






## 🧠 Prompt Strategy

We designed a scoped system prompt that positions Gemini as a dedicated *civic assistant*, grounded in our local schemes database, with dynamic Hindi/English instructions based on user preference — ensuring accurate, concise, and language-appropriate responses for every citizen query.

## 👤 Built By
## 🎯 Chosen Vertical

*Civic Services & Governance* — We focused on helping citizens access government scheme information, understand document requirements, and interact with local civic bodies (issue reporting + complaint tracking), rather than a single-purpose tool. This vertical was chosen because it affects the largest number of citizens daily and has the most fragmented, hard-to-navigate information landscape — making it the best fit for a GenAI-powered simplification layer.

## 📝 Assumptions Made

- Complaint tracking uses in-memory mock data (resets on server restart) since no real municipal complaint API was available within the hackathon timeframe — the interface and logic are built to be a drop-in replacement once a real backend/database is connected.
- Scheme data (PM Awas Yojana, Ayushman Bharat, Scholarships, Pension) is curated from publicly available government scheme information as of 2026 and simplified for citizen readability; exact eligibility criteria may vary by state and should be verified on official portals.
- The AI chatbot is scoped to redirect off-topic queries back to civic/government topics, assuming the primary use case is civic assistance rather than general-purpose chat.
- Hindi/English toggle covers the AI chatbot and schemes content; complaint/tracking form fields (name, location, category) are left in English as they are largely universal short-form inputs.


Abhishek Yadav — for DEVENGERS PromptWars 2026
