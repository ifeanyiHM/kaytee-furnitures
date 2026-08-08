import type {
  AIProvider,
  ChatCompletionParams,
  ChatCompletionResult,
} from "../types";
import { ProviderError, parseRetryAfterMs } from "../errors";

// #6 priority: free, edge-native (pairs naturally with Next.js edge routes),
// smaller model selection. Uses Cloudflare's native /ai/run REST API.
const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID ?? "";
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN ?? "";
const MODEL = process.env.CLOUDFLARE_MODEL ?? "@cf/meta/llama-3.1-8b-instruct";

function endpoint() {
  return `https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/run/${MODEL}`;
}

export const cloudflareProvider: AIProvider = {
  id: "cloudflare",

  async chat(params: ChatCompletionParams): Promise<ChatCompletionResult> {
    const res = await fetch(endpoint(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({
        messages: params.messages,
        temperature: params.temperature ?? 0.7,
        max_tokens: params.maxTokens ?? 1024,
      }),
    });

    if (!res.ok) {
      throw new ProviderError(
        `[cloudflare] chat completion failed (${res.status}): ${await res.text()}`,
        {
          status: res.status,
          providerId: "cloudflare",
          retryAfterMs: parseRetryAfterMs(res.headers.get("retry-after")),
        },
      );
    }

    const data = await res.json();
    const content = data.result?.response ?? "";
    return { content, provider: "cloudflare", model: MODEL };
  },

  async *chatStream(params: ChatCompletionParams): AsyncGenerator<string> {
    const res = await fetch(endpoint(), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_TOKEN}`,
      },
      body: JSON.stringify({
        messages: params.messages,
        temperature: params.temperature ?? 0.7,
        max_tokens: params.maxTokens ?? 1024,
        stream: true,
      }),
    });

    if (!res.ok || !res.body) {
      throw new ProviderError(
        `[cloudflare] streaming chat failed (${res.status}): ${await res.text()}`,
        {
          status: res.status,
          providerId: "cloudflare",
          retryAfterMs: parseRetryAfterMs(res.headers.get("retry-after")),
        },
      );
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split("\n");
      buffer = lines.pop() ?? "";

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith("data:")) continue;
        const payload = trimmed.slice(5).trim();
        if (payload === "[DONE]") return;
        try {
          const json = JSON.parse(payload);
          const delta = json.response;
          if (delta) yield delta;
        } catch {
          // ignore malformed chunks
        }
      }
    }
  },
};
