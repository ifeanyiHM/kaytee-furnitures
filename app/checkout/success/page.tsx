import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { RiCheckboxCircleLine } from "react-icons/ri";

export default async function CheckoutSuccessPage({ searchParams }: { searchParams: Promise<{ orderId?: string }> }) {
  const sp = await searchParams;
  return (
    <>
      <Header />
      <main className="min-h-screen bg-sand-50 flex items-center justify-center px-4 py-24">
        <div className="max-w-md text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <RiCheckboxCircleLine className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="font-display text-3xl text-charcoal mb-3">Order placed!</h1>
          <p className="font-sans text-charcoal-muted mb-8 leading-relaxed">
            Thank you for your order. We've sent a confirmation to your email and you can track your delivery from your dashboard.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href={sp.orderId ? `/orders/${sp.orderId}` : "/orders"}><Button variant="outline">Track order</Button></Link>
            <Link href="/shop"><Button>Continue shopping</Button></Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
