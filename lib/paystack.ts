const PAYSTACK_BASE = "https://api.paystack.co";
const SECRET = process.env.PAYSTACK_SECRET_KEY!;

async function paystackRequest<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const res = await fetch(`${PAYSTACK_BASE}${path}`, {
    ...options,
    headers: {
      Authorization: `Bearer ${SECRET}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  const data = await res.json();
  if (!data.status) throw new Error(data.message || "Paystack error");
  return data;
}

export const paystack = {
  initializeTransaction: (body: {
    email: string;
    amount: number;
    reference: string;
    callback_url?: string;
    metadata?: Record<string, unknown>;
  }) =>
    paystackRequest<{ data: { authorization_url: string; reference: string } }>(
      "/transaction/initialize",
      { method: "POST", body: JSON.stringify(body) }
    ),

  verifyTransaction: (reference: string) =>
    paystackRequest<{ data: { status: string; amount: number; reference: string } }>(
      `/transaction/verify/${reference}`
    ),
};
