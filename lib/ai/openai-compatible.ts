import type {
  AIProvider,
  ChatCompletionParams,
  ChatCompletionResult,
} from "./types";
import { ProviderError, parseRetryAfterMs } from "./errors";

interface OpenAICompatibleConfig {
  id: string;
  baseURL: string; // e.g. "https://api.groq.com/openai/v1"
  apiKey: string;
  model: string;
  extraHeaders?: Record<string, string>;
  /** Overrides the default max_tokens (useful for models that spend part of
   *  the budget on hidden reasoning, e.g. Gemini 2.5). */
  maxTokens?: number;
}

/**
 * Covers any provider that implements the OpenAI /chat/completions shape:
 * Groq, Cerebras, OpenRouter, Mistral, Hugging Face Router, and Gemini
 * (via its OpenAI-compatible endpoint).
 */
export class OpenAICompatibleProvider implements AIProvider {
  id: string;
  private baseURL: string;
  private apiKey: string;
  private model: string;
  private extraHeaders: Record<string, string>;
  private maxTokens?: number;

  constructor(config: OpenAICompatibleConfig) {
    this.id = config.id;
    this.baseURL = config.baseURL.replace(/\/$/, "");
    this.apiKey = config.apiKey;
    this.model = config.model;
    this.extraHeaders = config.extraHeaders ?? {};
    this.maxTokens = config.maxTokens;
  }

  private headers() {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.apiKey}`,
      ...this.extraHeaders,
    };
  }

  async chat(params: ChatCompletionParams): Promise<ChatCompletionResult> {
    const res = await fetch(`${this.baseURL}/chat/completions`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify({
        model: this.model,
        messages: params.messages,
        temperature: params.temperature ?? 0.7,
        max_tokens: params.maxTokens ?? this.maxTokens ?? 1024,
        stream: false,
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new ProviderError(
        `[${this.id}] chat completion failed (${res.status}): ${text}`,
        {
          status: res.status,
          providerId: this.id,
          retryAfterMs: parseRetryAfterMs(res.headers.get("retry-after")),
        },
      );
    }

    const data = await res.json();
    const content = data.choices?.[0]?.message?.content ?? "";
    return { content, provider: this.id, model: this.model };
  }

  async *chatStream(params: ChatCompletionParams): AsyncGenerator<string> {
    const res = await fetch(`${this.baseURL}/chat/completions`, {
      method: "POST",
      headers: this.headers(),
      body: JSON.stringify({
        model: this.model,
        messages: params.messages,
        temperature: params.temperature ?? 0.7,
        max_tokens: params.maxTokens ?? this.maxTokens ?? 1024,
        stream: true,
      }),
    });

    if (!res.ok || !res.body) {
      // Read the body so the real reason (bad key, quota, retired model)
      // shows up in logs instead of an empty message.
      const text = await res.text().catch(() => "");
      throw new ProviderError(
        `[${this.id}] streaming chat failed (${res.status}): ${text}`,
        {
          status: res.status,
          providerId: this.id,
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
          const delta = json.choices?.[0]?.delta?.content;
          if (delta) yield delta;
        } catch {
          // ignore malformed keep-alive chunks
        }
      }
    }
  }
}
