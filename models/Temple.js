// models/Temple.js

import mongoose from "mongoose";

const timelineSchema = new mongoose.Schema({
  year: String,
  description: String,
});

const qrCodeImageSchema = new mongoose.Schema({
  base64: String,
});

const virtualTourSchema = new mongoose.Schema({
  embedCode: String,
});

const templeSchema = new mongoose.Schema({
  state: String,
  templeName: String,
  imageUrl: String,
  uniqueArchitecture: String,
  architecturalStyle: String,
  specialElements: String,
  festivalHighlight: String,
  constructionTechnique: String,
  spiritualSignificance: String,
  UNESCOStatus: String,
  alignmentWithAstronomy: String,
  specialFeatures: String, // Semicolon-separated string in DB (split in frontend)
  builtBy: String,
  materialsUsed: String,
  inspiration: String,
  sourceUrl: String,
  timeline: [timelineSchema],
  qrCodeImage: qrCodeImageSchema,
  virtualTour: virtualTourSchema,
});

const Temple = mongoose.model("Temple", templeSchema);
export default Temple;
