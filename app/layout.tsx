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
  icons: {
    icon: [{ url: "/images/logo.svg", type: "image/svg+xml" }],
    shortcut: "/images/logo.svg",
    apple: "/images/logo.svg",
  },
  openGraph: {
    title: "Dreamers Den — An A-frame Cabana in Nuwara Eliya",
    description:
      "A three-bedroom A-frame cabin in Sri Lanka's misty tea country. Rented as a whole — for couples and small adult groups.",
    url: "https://dreamersden.lk",
    siteName: "Dreamers Den",
    locale: "en_LK",
    type: "website",
    images: [{ url: "/images/logo.svg", width: 1080, height: 1080, alt: "Dreamer's Den" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dreamers Den — An A-frame Cabana in Nuwara Eliya",
    description:
      "A three-bedroom A-frame cabin in Sri Lanka's misty tea country. Rented as a whole.",
    images: ["/images/logo.svg"],
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
      <head>
        {/* Pre-paint: hide the page-intro for repeat visitors / reduced-motion
            users so they never see the curtain flash. Inline so it runs
            before first paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{var s=sessionStorage.getItem('dd-intro-seen-v1')==='1';var r=matchMedia('(prefers-reduced-motion: reduce)').matches;if(s||r){var st=document.createElement('style');st.textContent='.page-intro{display:none!important}';document.head.appendChild(st)}}catch(e){}",
          }}
        />
      </head>
      <body className="bg-[var(--color-midnight)] text-[var(--color-cream)] antialiased">
        {children}
      </body>
    </html>
  );
}
