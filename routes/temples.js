// routes/temples.js

import express from "express";
import Temple from "../models/Temple.js";

const router = express.Router();

// GET all temples
router.get("/", async (req, res) => {
  try {
    const temples = await Temple.find();
    res.json(temples);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch temples" });
  }
});

// ✅ GET temples by state (used by frontend query like `/api/temples/Andhra Pradesh`)
router.get("/:state", async (req, res) => {
  try {
    const state = req.params.state;
    const temples = await Temple.find({ state: new RegExp(state, "i") }); // Case-insensitive
    res.json(temples);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch temples by state" });
  }
});

// POST: Add new temple
router.post("/", async (req, res) => {
  try {
    const newTemple = new Temple(req.body);
    await newTemple.save();
    res.status(201).json(newTemple);
  } catch (err) {
    res.status(400).json({ error: "Failed to add temple" });
  }
});

export default router;
