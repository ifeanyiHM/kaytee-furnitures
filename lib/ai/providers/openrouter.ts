import { OpenAICompatibleProvider } from "../openai-compatible";

// #4 priority: most model variety of any free tier here, but a tight daily
// request cap (50/day fresh account, 1000/day after a one-time $10 top-up).
// The free model roster rotates — check https://openrouter.ai/models?max_price=0
export const openrouterProvider = new OpenAICompatibleProvider({
  id: "openrouter",
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY ?? "",
  model:
    process.env.OPENROUTER_MODEL ?? "meta-llama/llama-3.3-70b-instruct:free",
  extraHeaders: {
    // Recommended by OpenRouter for analytics and fair rate-limiting
    "HTTP-Referer": process.env.APP_URL ?? "http://localhost:3000",
    "X-Title": process.env.APP_NAME ?? "My App",
  },
});
