import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://kaytee-furnitures.vercel.app"),

  title: {
    default: "Kaytee Furnitures",
    template: "%s | Kaytee Furnitures",
  },

  description:
    "Premium furniture thoughtfully designed to elevate every space you call home.",

  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Kaytee Furnitures",
    url: "https://kaytee-furnitures.vercel.app",

    images: [
      {
        url: "https://kaytee-furnitures.vercel.app/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kaytee Furnitures",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    images: ["https://kaytee-furnitures.vercel.app/og-image.jpg"],
  },
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
