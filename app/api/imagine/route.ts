export const runtime = "nodejs";

// Uses Hugging Face Inference API for image generation (free tier).
// Model: black-forest-labs/FLUX.1-schnell — fast, high quality, free.
const HF_API_KEY = process.env.HUGGINGFACE_API_KEY ?? "";
const MODEL = "black-forest-labs/FLUX.1-schnell";

export async function POST(req: Request) {
  const { prompt } = await req.json();

  if (!prompt?.trim()) {
    return new Response("prompt is required", { status: 400 });
  }

  if (!HF_API_KEY) {
    return new Response("HUGGINGFACE_API_KEY is not set", { status: 500 });
  }

  try {
    const res = await fetch(
      `https://router.huggingface.co/hf-inference/models/${MODEL}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_API_KEY}`,
          "Content-Type": "application/json",
          "x-use-cache": "false",
        },
        body: JSON.stringify({ inputs: prompt }),
      },
    );

    if (!res.ok) {
      const text = await res.text();
      return new Response(`Image generation failed (${res.status}): ${text}`, {
        status: res.status,
      });
    }

    // HF returns raw image bytes
    const imageBuffer = await res.arrayBuffer();
    return new Response(imageBuffer, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    return new Response((err as Error).message, { status: 500 });
  }
}
