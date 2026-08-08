import { OpenAICompatibleProvider } from "../openai-compatible";

// #7 priority: massive open-model catalog, but free-tier rate limits are not
// published as fixed numbers — they vary with model popularity and load.
export const huggingfaceProvider = new OpenAICompatibleProvider({
  id: "huggingface",
  baseURL: "https://router.huggingface.co/v1",
  apiKey: process.env.HUGGINGFACE_API_KEY ?? "",
  model: process.env.HUGGINGFACE_MODEL ?? "meta-llama/Llama-3.3-70B-Instruct",
});
