import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function NotFound() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-sand-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="font-display text-[8rem] text-sand-200 leading-none select-none">404</p>
          <h1 className="font-display text-3xl text-charcoal mb-3 -mt-4">Page not found</h1>
          <p className="font-sans text-charcoal-muted mb-8 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex gap-3 justify-center">
            <Link href="/"><Button variant="outline">Go home</Button></Link>
            <Link href="/shop"><Button>Browse shop</Button></Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
