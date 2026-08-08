export type ProviderErrorType = "auth" | "rate_limit" | "server" | "unknown";

export class ProviderError extends Error {
  status: number;
  providerId: string;
  type: ProviderErrorType;
  /** Parsed Retry-After header, in milliseconds, if the provider sent one */
  retryAfterMs?: number;

  constructor(
    message: string,
    opts: { status: number; providerId: string; retryAfterMs?: number },
  ) {
    super(message);
    this.name = "ProviderError";
    this.status = opts.status;
    this.providerId = opts.providerId;
    this.retryAfterMs = opts.retryAfterMs;
    this.type = classify(opts.status);
  }
}

function classify(status: number): ProviderErrorType {
  if (status === 401 || status === 403) return "auth";
  if (status === 429) return "rate_limit";
  if (status >= 500) return "server";
  return "unknown";
}

/** Parses a Retry-After header (seconds, or an HTTP-date) into milliseconds. */
export function parseRetryAfterMs(header: string | null): number | undefined {
  if (!header) return undefined;

  const seconds = Number(header);
  if (!Number.isNaN(seconds)) return seconds * 1000;

  const dateMs = new Date(header).getTime();
  if (!Number.isNaN(dateMs)) return Math.max(0, dateMs - Date.now());

  return undefined;
}
