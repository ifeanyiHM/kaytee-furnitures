import { OpenAICompatibleProvider } from "../openai-compatible";

// #1 priority: best free-tier quality-to-limits ratio as of Aug 2026.
// Verify current models/limits at https://ai.google.dev/gemini-api/docs/rate-limits
export const geminiProvider = new OpenAICompatibleProvider({
  id: "gemini",
  baseURL: "https://generativelanguage.googleapis.com/v1beta/openai",
  apiKey: process.env.GEMINI_API_KEY ?? "",
  model: process.env.GEMINI_MODEL ?? "gemini-2.5-flash",
});
