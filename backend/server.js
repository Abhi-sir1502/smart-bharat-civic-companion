import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import { schemes } from "./data/schemes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

// ---------- In-memory mock complaint store ----------
let complaints = [];
let complaintCounter = 1000;

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
  const { category, description, location, name } = req.body;
  const id = `CIV${complaintCounter++}`;
  const complaint = {
    id,
    category: category || "General",
    description: description || "",
    location: location || "",
    name: name || "Anonymous",
    status: "Registered",
    createdAt: new Date().toISOString(),
    timeline: [
      { status: "Registered", date: new Date().toISOString() },
    ],
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

  // Mock progressive status based on time elapsed (for demo purposes)
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
app.post("/api/chat", async (req, res) => {
  try {
    const { message, language } = req.body;
    if (!message) return res.status(400).json({ error: "Message required" });

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
            parts: [{ text: `${systemContext}\n\nUser question: ${message}` }],
          },
        ],
      }),
    });

    const data = await response.json();

    if (data.error) {
      return res.status(500).json({ error: data.error.message || "Gemini API error" });
    }

    const reply =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I couldn't process that. Please try again.";

    res.json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error while contacting AI" });
  }
});

app.get("/", (req, res) => {
  res.send("Smart Bharat backend is running.");
});

app.listen(PORT, () => {
  console.log(`Smart Bharat backend running on port ${PORT}`);
});
