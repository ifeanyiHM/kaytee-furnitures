import type {
  AIProvider,
  ChatCompletionParams,
  ChatCompletionResult,
} from "../types";
import { ProviderError, parseRetryAfterMs } from "../errors";

// #8 priority: smallest free allowance of the group, but fine for light use.
// Uses Cohere's native v2/chat API since it isn't OpenAI-compatible.
const API_KEY = process.env.COHERE_API_KEY ?? "";
const MODEL = process.env.COHERE_MODEL ?? "command-r7b-12-2024";

function toCohereMessages(messages: ChatCompletionParams["messages"]) {
  return messages.map((m) => ({
    role:
      m.role === "assistant"
        ? "assistant"
        : m.role === "system"
          ? "system"
          : "user",
    content: m.content,
  }));
}

export const cohereProvider: AIProvider = {
  id: "cohere",

  async chat(params: ChatCompletionParams): Promise<ChatCompletionResult> {
    const res = await fetch("https://api.cohere.com/v2/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: toCohereMessages(params.messages),
        temperature: params.temperature ?? 0.7,
        max_tokens: params.maxTokens ?? 1024,
      }),
    });

    if (!res.ok) {
      throw new ProviderError(
        `[cohere] chat completion failed (${res.status}): ${await res.text()}`,
        {
          status: res.status,
          providerId: "cohere",
          retryAfterMs: parseRetryAfterMs(res.headers.get("retry-after")),
        },
      );
    }

    const data = await res.json();
    const content = data.message?.content?.[0]?.text ?? "";
    return { content, provider: "cohere", model: MODEL };
  },

  async *chatStream(params: ChatCompletionParams): AsyncGenerator<string> {
    const res = await fetch("https://api.cohere.com/v2/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: toCohereMessages(params.messages),
        temperature: params.temperature ?? 0.7,
        max_tokens: params.maxTokens ?? 1024,
        stream: true,
      }),
    });

    if (!res.ok || !res.body) {
      throw new ProviderError(
        `[cohere] streaming chat failed (${res.status}): ${await res.text()}`,
        {
          status: res.status,
          providerId: "cohere",
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
        if (!line.trim()) continue;
        try {
          const json = JSON.parse(line);
          if (json.type === "content-delta") {
            const delta = json.delta?.message?.content?.text;
            if (delta) yield delta;
          }
        } catch {
          // ignore partial/malformed lines
        }
      }
    }
  },
};
