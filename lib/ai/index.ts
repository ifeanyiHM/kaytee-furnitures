import type {
  AIProvider,
  ChatCompletionParams,
  ChatCompletionResult,
} from "./types";
import { ProviderError } from "./errors";
import { geminiProvider } from "./providers/gemini";
import { cerebrasProvider } from "./providers/cerebras";
import { groqProvider } from "./providers/groq";
import { openrouterProvider } from "./providers/openrouter";
import { mistralProvider } from "./providers/mistral";
import { cloudflareProvider } from "./providers/cloudflare";
import { huggingfaceProvider } from "./providers/huggingface";
import { cohereProvider } from "./providers/cohere";

/**
 * Providers ranked best -> least for free-tier chat use (as of Aug 2026).
 * Full rationale in README.md. Free-tier terms shift often — re-verify
 * against each provider's docs before relying on this ranking long-term.
 */
const registry: Record<string, AIProvider> = {
  gemini: geminiProvider,
  cerebras: cerebrasProvider,
  groq: groqProvider,
  openrouter: openrouterProvider,
  mistral: mistralProvider,
  cloudflare: cloudflareProvider,
  huggingface: huggingfaceProvider,
  cohere: cohereProvider,
};

const PRIORITY_ORDER = [
  "gemini",
  "cerebras",
  "groq",
  "openrouter",
  "mistral",
  "cloudflare",
  "huggingface",
  "cohere",
];

/**
 * Returns the provider named by AI_PROVIDER. This is the single switch:
 * change the env var, restart the app, everything else stays the same.
 */
export function getProvider(): AIProvider {
  const id = (process.env.AI_PROVIDER ?? "gemini").toLowerCase();
  const provider = registry[id];
  if (!provider) {
    throw new Error(
      `Unknown AI_PROVIDER "${id}". Valid options: ${Object.keys(registry).join(", ")}`,
    );
  }
  return provider;
}

function buildOrder(preferredId?: string): string[] {
  return preferredId
    ? [preferredId, ...PRIORITY_ORDER.filter((id) => id !== preferredId)]
    : PRIORITY_ORDER;
}

// Cap on how long we'll block a request waiting on a single rate-limit
// retry. If a provider's Retry-After is longer than this, we skip the wait
// and move straight to the next provider instead of stalling the user.
const MAX_RATE_LIMIT_WAIT_MS = 3000;

/**
 * Returns a retry delay only when it's worth waiting: the failure was a
 * 429, the provider told us how long to wait, and that wait is short.
 * Auth errors (401/403), server errors (5xx), and anything else fall
 * through with no delay — "fail fast" and let the caller move on.
 */
function getRetryDelay(err: unknown): number | undefined {
  if (!(err instanceof ProviderError)) return undefined;
  if (err.type !== "rate_limit") return undefined;
  if (err.retryAfterMs === undefined) return undefined;
  if (err.retryAfterMs > MAX_RATE_LIMIT_WAIT_MS) return undefined;
  return err.retryAfterMs;
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Tries providers in priority order, falling back on failure.
 *
 * - 429 rate limit with a short Retry-After: waits, retries the SAME
 *   provider once, then moves on if it still fails.
 * - 401/403 auth error: fails fast — no retry, straight to the next
 *   provider (a bad key for provider A says nothing about provider B).
 * - 5xx / anything else: also moves on immediately, no retry.
 */
export async function chatWithFallback(
  params: ChatCompletionParams,
  preferredId?: string,
): Promise<ChatCompletionResult> {
  const order = buildOrder(preferredId);
  let lastError: unknown;

  for (const id of order) {
    const provider = registry[id];
    if (!provider) continue;

    try {
      return await provider.chat(params);
    } catch (err) {
      lastError = err;
      const delay = getRetryDelay(err);
      if (delay !== undefined) {
        await sleep(delay);
        try {
          return await provider.chat(params); // one retry, same provider
        } catch (retryErr) {
          lastError = retryErr;
        }
      }
      // fall through to the next provider in priority order
    }
  }

  throw lastError ?? new Error("No AI providers available.");
}

/**
 * Streaming counterpart to chatWithFallback. Fallback only happens
 * BEFORE the first chunk is yielded — once a provider has started
 * streaming to the caller, switching providers mid-stream would produce
 * a garbled, half-and-half answer, so at that point errors just propagate.
 *
 * Same 429-retry / 401-fail-fast rules as chatWithFallback apply to the
 * pre-first-chunk phase.
 */
export async function* chatStreamWithFallback(
  params: ChatCompletionParams,
  preferredId?: string,
  /** Called once, right before the first chunk, with the provider that won. */
  onProviderSelected?: (providerId: string) => void,
): AsyncGenerator<string> {
  const order = buildOrder(preferredId);
  let lastError: unknown;

  for (const id of order) {
    const provider = registry[id];
    if (!provider) continue;

    for (let attempt = 0; attempt < 2; attempt++) {
      const iterator = provider.chatStream(params)[Symbol.asyncIterator]();
      let first: IteratorResult<string>;

      try {
        first = await iterator.next();
      } catch (err) {
        lastError = err;
        const delay = attempt === 0 ? getRetryDelay(err) : undefined;
        if (delay !== undefined) {
          await sleep(delay);
          continue; // retry same provider once
        }
        break; // move to next provider
      }

      onProviderSelected?.(provider.id);

      if (first.done) return; // provider returned an empty but valid stream

      // Committed to this provider now — no more fallback past this point.
      yield first.value;
      while (true) {
        const { value, done } = await iterator.next();
        if (done) return;
        yield value;
      }
    }
  }

  throw lastError ?? new Error("No AI providers available.");
}

export * from "./types";
export { ProviderError } from "./errors";
