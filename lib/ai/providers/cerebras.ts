import { OpenAICompatibleProvider } from "../openai-compatible";

// #2 priority: huge daily token volume and very fast, but only 2 free models.
// Verify current rate limits at https://inference-docs.cerebras.ai/support/rate-limits
export const cerebrasProvider = new OpenAICompatibleProvider({
  id: "cerebras",
  baseURL: "https://api.cerebras.ai/v1",
  apiKey: process.env.CEREBRAS_API_KEY ?? "",
  model: process.env.CEREBRAS_MODEL ?? "gpt-oss-120b",
});
