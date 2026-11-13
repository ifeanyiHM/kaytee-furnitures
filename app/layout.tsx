import KayteeChatWidget from "@/components/KayteeChatWidget";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kayteefurnitures.com"),

  title: {
    default: "Kaytee Furnitures & Interior | Interior Design Studio",
    template: "%s | Kaytee Furnitures & Interior",
  },

  description:
    "Kaytee Furnitures & Interior is a Lagos-based interior design studio creating thoughtful, functional and beautifully considered spaces.",

  applicationName: "Kaytee Furnitures & Interior",
  keywords: [
    "interior design Lagos",
    "interior designer Lagos",
    "luxury interior design Nigeria",
    "bespoke furniture Lagos",
    "living room design",
    "bedroom design",
    "kitchen renovation Lagos",
    "Kaytee Furnitures & Interior",
  ],
  alternates: { canonical: "/" },
  formatDetection: { telephone: false, email: false, address: false },
  // Set NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION to the token from Search Console.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,

  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: "Kaytee Furnitures & Interior",
    url: "https://www.kayteefurnitures.com",

    images: [
      {
        url: "https://www.kayteefurnitures.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kaytee Furnitures & Interior — Interior Design Studio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    images: ["https://www.kayteefurnitures.com/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-sand-50 text-charcoal antialiased">
        <JsonLd data={organizationJsonLd} />
        <JsonLd data={websiteJsonLd} />
        {children}
        <KayteeChatWidget />
      </body>
    </html>
  );
}
