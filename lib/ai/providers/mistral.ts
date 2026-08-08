import { OpenAICompatibleProvider } from "../openai-compatible";

// #5 priority: large free token allowance, but free-tier prompts may be
// used for model training — a privacy tradeoff to weigh for sensitive data.
export const mistralProvider = new OpenAICompatibleProvider({
  id: "mistral",
  baseURL: "https://api.mistral.ai/v1",
  apiKey: process.env.MISTRAL_API_KEY ?? "",
  model: process.env.MISTRAL_MODEL ?? "mistral-small-latest",
});
