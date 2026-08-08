import { OpenAICompatibleProvider } from "../openai-compatible";

// #3 priority: fast inference (LPU hardware), solid free tier, open models only.
export const groqProvider = new OpenAICompatibleProvider({
  id: "groq",
  baseURL: "https://api.groq.com/openai/v1",
  apiKey: process.env.GROQ_API_KEY ?? "",
  model: process.env.GROQ_MODEL ?? "llama-3.1-8b-instant",
});
