import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  ),
  title: {
    default: "Luxe Interiors — Premium Interior Design & Furniture",
    template: "%s | Kaytee Furnitures",
  },
  description:
    "Award-winning interior design studio crafting luxurious, personalised spaces. Explore our portfolio, shop curated furniture, or book a consultation.",
  keywords: [
    "interior design",
    "luxury furniture",
    "home decor",
    "interior designer Nigeria",
    "Lagos interior design",
  ],
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Kaytee Furnitures",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-sand-50 text-charcoal antialiased">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
