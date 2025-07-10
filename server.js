import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import axios from "axios";
import templeRoutes from "./routes/temples.js";
import Temple from "./models/Temple.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoURI = process.env.MONGODB_URI;

// ✅ Connect to MongoDB
mongoose.connect(mongoURI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));



  app.get("/", (req, res) => {
    res.send("Temple Backend API is running ✅");
  });
// ✅ Routes
app.use("/api/temples", templeRoutes);

// ✅ Get All Temples
app.get("/api/temples", async (req, res) => {
  try {
    const temples = await Temple.find();
    res.json(temples);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch temples" });
  }
});

// ✅ Chat Endpoint using DeepSeek (OpenRouter)
app.post("/chat", async (req, res) => {
  const userMessage = req.body.message;
  if (!userMessage) return res.status(400).json({ error: "No message provided" });

  try {
    console.log("🟢 Request received:", userMessage);

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-r1:free", // ✅ Check OpenRouter docs for latest models
        messages: [
          {
            role: "system",
            content: "You are TempleGPT, an expert on Indian temple architecture and history.",
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
        max_tokens: 512, // ✅ must be here, not inside a message object
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5001", // Optional, but good to include
        },
      }
    );

    const reply = response.data.choices?.[0]?.message?.content || "No response from model.";
    res.json({ reply });
  } catch (error) {
    console.error("❌ OpenRouter API error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to get response from DeepSeek (OpenRouter)" });
  }
});

const PORT = 5001;
app.listen(PORT, () => {
  console.log(`🧠 AI Chatbot backend running on port ${PORT}`);
});
