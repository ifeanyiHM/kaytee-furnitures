import { chatStreamWithFallback } from "@/lib/ai";
import type { ChatMessage } from "@/lib/ai/types";

// Edge runtime works for all providers here since they're plain fetch calls.
export const runtime = "nodejs";
// export const runtime = "edge";

export async function POST(req: Request) {
  const { messages }: { messages: ChatMessage[] } = await req.json();

  if (!messages?.length) {
    return new Response("messages is required", { status: 400 });
  }

  // Preferred provider comes from AI_PROVIDER — chatStreamWithFallback adds
  // automatic fallback to the rest of the priority list if it fails before
  // sending any output.
  const preferredId = process.env.AI_PROVIDER;
  let servedBy = "unknown";

  const generator = chatStreamWithFallback(
    { messages },
    preferredId,
    (providerId) => {
      servedBy = providerId;
    },
  );

  // Pull the first chunk now, before building the Response. This is what
  // actually resolves which provider won (all fallback attempts happen
  // inside this single call), so by the time we set headers below,
  // `servedBy` is accurate — and if every provider fails, we can return a
  // real error status instead of a 200 with an error message buried in the
  // body.
  let first: IteratorResult<string>;
  try {
    first = await generator.next();
  } catch (err) {
    return new Response((err as Error).message, { status: 502 });
  }

  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder();
      try {
        if (!first.done) controller.enqueue(encoder.encode(first.value));
        for await (const chunk of generator) {
          controller.enqueue(encoder.encode(chunk));
        }
      } catch (err) {
        // A failure here happens mid-stream, after output has already been
        // sent — too late to fall back or change the response status, so
        // we surface it inline instead.
        controller.enqueue(
          encoder.encode(`\n\n[error: ${(err as Error).message}]`),
        );
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-AI-Provider": servedBy,
    },
  });
}
