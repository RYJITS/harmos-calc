import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getHarmoSRules() {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "Explique les règles de promotion et de passage entre les niveaux 'Général', 'Moderne' et 'Pré-gymnasial' dans le système HarmoS en Suisse (probablement Valais ou Fribourg). Donne les seuils de moyenne et les conditions sur les branches principales (Français, Math, Allemand). Réponds en JSON avec une structure claire.",
  });
  return response.text;
}
