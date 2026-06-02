import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, Geist_Mono, Sora } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["SOFT", "opsz"],
  variable: "--font-fraunces",
});

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist-mono",
});

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sora",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dreamersden.lk"),
  title: {
    default: "Dreamers Den — An A-frame Cabana in Nuwara Eliya",
    template: "%s · Dreamers Den",
  },
  description:
    "A three-bedroom A-frame cabin on Badulla Road, Nuwara Eliya. Rented as a whole. Honey-timber interior under a soaring apex, fairy-light glow at dusk, polished concrete floors, mountain mist on the doorstep.",
  keywords: [
    "Nuwara Eliya A-frame",
    "Sri Lanka cabin",
    "wood cabana",
    "tea country stay",
    "Dreamers Den",
    "Badulla Road",
    "Gregory Lake",
    "Ramboda Falls",
  ],
  openGraph: {
    title: "Dreamers Den — An A-frame Cabana in Nuwara Eliya",
    description:
      "A three-bedroom A-frame cabin in Sri Lanka's misty tea country. Rented as a whole — for couples and small adult groups.",
    url: "https://dreamersden.lk",
    siteName: "Dreamers Den",
    locale: "en_LK",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dreamers Den — An A-frame Cabana in Nuwara Eliya",
    description:
      "A three-bedroom A-frame cabin in Sri Lanka's misty tea country. Rented as a whole.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0E1018",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${geist.variable} ${geistMono.variable} ${sora.variable}`}
    >
      <body className="bg-[var(--color-midnight)] text-[var(--color-cream)] antialiased">
        {children}
      </body>
    </html>
  );
}
