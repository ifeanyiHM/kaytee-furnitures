import KayteeChatWidget from "@/components/KayteeChatWidget";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kayteefurnitures.com"),

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
    url: "https://www.kayteefurnitures.com",

    images: [
      {
        url: "https://www.kayteefurnitures.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kaytee Furnitures",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    images: ["https://www.kayteefurnitures.com/og-image.jpg"],
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
        {children}
        <KayteeChatWidget />
      </body>
    </html>
  );
}
