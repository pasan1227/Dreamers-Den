import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, Geist_Mono, Sora } from "next/font/google";
import { JsonLd } from "@/components/seo/JsonLd";
import { lodgingBusinessJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

const SITE_URL = "https://dreamersdencabana.com";
const OG_IMAGE = "/images/Images_new/image12.jpeg";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Dreamers Den — A-frame Cabana in Nuwara Eliya, Sri Lanka",
    template: "%s · Dreamers Den",
  },
  description:
    "A three-bedroom A-frame cabin on Badulla Road, Nuwara Eliya — rented as a whole for couples and small adult groups. Honey-timber interior, polished concrete floors, fairy-light glow at dusk, mountain mist on the doorstep, six minutes from Gregory Lake.",
  applicationName: "Dreamers Den",
  authors: [{ name: "Dreamers Den" }],
  creator: "Dreamers Den",
  publisher: "Dreamers Den",
  category: "travel",
  keywords: [
    "Dreamers Den",
    "Dreamers Den Nuwara Eliya",
    "Nuwara Eliya cabin",
    "Nuwara Eliya A-frame",
    "Nuwara Eliya cabana",
    "Nuwara Eliya accommodation",
    "Nuwara Eliya holiday rental",
    "Sri Lanka A-frame cabin",
    "Sri Lanka tea country stay",
    "wooden cabin Sri Lanka",
    "Badulla Road Nuwara Eliya",
    "Gregory Lake stay",
    "Hill country accommodation Sri Lanka",
    "Ramboda Falls",
    "Pedro Tea Estate",
    "Horton Plains lodging",
  ],
  alternates: {
    canonical: SITE_URL,
  },
  formatDetection: {
    telephone: true,
    address: true,
    email: true,
  },
  icons: {
    icon: [{ url: "/images/logo.svg", type: "image/svg+xml" }],
    shortcut: "/images/logo.svg",
    apple: "/images/logo.svg",
  },
  openGraph: {
    title: "Dreamers Den — A-frame Cabana in Nuwara Eliya, Sri Lanka",
    description:
      "A three-bedroom A-frame cabin in Sri Lanka's misty tea country, six minutes from Gregory Lake. Rented as a whole — for couples and small adult groups.",
    url: SITE_URL,
    siteName: "Dreamers Den",
    locale: "en_LK",
    type: "website",
    images: [
      {
        url: OG_IMAGE,
        width: 1200,
        height: 1600,
        alt: "The Dreamers Den A-frame cabana glowing at twilight in the Nuwara Eliya hills",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Dreamers Den — A-frame Cabana in Nuwara Eliya, Sri Lanka",
    description:
      "A three-bedroom A-frame cabin in Sri Lanka's misty tea country. Rented as a whole — six minutes from Gregory Lake.",
    images: [OG_IMAGE],
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
        <JsonLd id="ld-website" data={websiteJsonLd(SITE_URL)} />
        <JsonLd id="ld-lodging" data={lodgingBusinessJsonLd(SITE_URL)} />
      </body>
    </html>
  );
}
