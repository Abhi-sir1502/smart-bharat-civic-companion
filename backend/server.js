import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import compression from "compression";
import { schemes } from "./data/schemes.js";

dotenv.config();

const app = express();

// ---------- Security & efficiency middleware ----------
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json({ limit: "50kb" }));

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many requests, please try again later." },
});
app.use(generalLimiter);

const chatLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: "Too many chat requests, please slow down." },
});

const PORT = process.env.PORT || 5000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// ---------- In-memory mock complaint store ----------
let complaints = [];
let complaintCounter = 1000;

// ---------- Input validation helpers ----------
function isNonEmptyString(value, maxLen = 500) {
  return typeof value === "string" && value.trim().length > 0 && value.length <= maxLen;
}

function sanitize(str) {
  if (typeof str !== "string") return "";
  return str.replace(/[<>]/g, "").trim().slice(0, 500);
}

// ---------- Schemes ----------
app.get("/api/schemes", (req, res) => {
  res.json(schemes);
});

app.get("/api/schemes/:id", (req, res) => {
  const scheme = schemes.find((s) => s.id === req.params.id);
  if (!scheme) return res.status(404).json({ error: "Scheme not found" });
  res.json(scheme);
});

// ---------- Complaints (mock) ----------
app.post("/api/complaints", (req, res) => {
  const { category, description, location, name } = req.body || {};

  if (!isNonEmptyString(description, 1000)) {
    return res.status(400).json({ error: "A valid description is required." });
  }
  if (!isNonEmptyString(location, 200)) {
    return res.status(400).json({ error: "A valid location is required." });
  }

  const id = `CIV${complaintCounter++}`;
  const complaint = {
    id,
    category: sanitize(category) || "General",
    description: sanitize(description),
    location: sanitize(location),
    name: sanitize(name) || "Anonymous",
    status: "Registered",
    createdAt: new Date().toISOString(),
    timeline: [{ status: "Registered", date: new Date().toISOString() }],
  };
  complaints.push(complaint);
  res.json(complaint);
});

app.get("/api/complaints", (req, res) => {
  res.json(complaints);
});

app.get("/api/complaints/:id", (req, res) => {
  const complaint = complaints.find((c) => c.id === req.params.id);
  if (!complaint) return res.status(404).json({ error: "Complaint not found" });

  const minutesElapsed = (Date.now() - new Date(complaint.createdAt)) / 60000;
  if (minutesElapsed > 2 && complaint.status === "Registered") {
    complaint.status = "In Progress";
    complaint.timeline.push({ status: "In Progress", date: new Date().toISOString() });
  }
  if (minutesElapsed > 5 && complaint.status === "In Progress") {
    complaint.status = "Resolved";
    complaint.timeline.push({ status: "Resolved", date: new Date().toISOString() });
  }
  res.json(complaint);
});

// ---------- AI Chatbot ----------
app.post("/api/chat", chatLimiter, async (req, res) => {
  try {
    const { message, language } = req.body || {};

    if (!isNonEmptyString(message, 500)) {
      return res.status(400).json({ error: "A valid message (max 500 characters) is required." });
    }

    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: "Server misconfiguration: missing API key." });
    }

    const safeMessage = sanitize(message);
    const langInstruction =
      language === "hi"
        ? "Reply in simple Hindi (Devanagari script)."
        : "Reply in simple, clear English.";

    const systemContext = `You are Smart Bharat Sahayak, an AI civic assistant for Indian citizens.
You help people understand government schemes (like PM Awas Yojana, Ayushman Bharat, scholarships, pensions),
required documents for services, and how to report civic issues (roads, streetlights, garbage) or track complaints.
Known schemes in our database: ${schemes.map((s) => s.name).join(", ")}.
Keep answers short, practical, and step-by-step where relevant. ${langInstruction}
If asked something unrelated to civic/government services, politely redirect to civic topics.`;

    const response = await fetch(GEMINI_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: `${systemContext}\n\nUser question: ${safeMessage}` }],
          },
        ],
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(502).json({ error: "AI service temporarily unavailable. Please try again." });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't process that. Please try again.";

    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: "Server error while contacting AI." });
  }
});

app.get("/", (req, res) => {
  res.send("Smart Bharat backend is running.");
});

// Generic error handler (avoids leaking stack traces)
app.use((err, req, res, next) => {
  res.status(500).json({ error: "Something went wrong." });
});

export { PORT };
export default app;