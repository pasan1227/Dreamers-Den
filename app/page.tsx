import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Rooms } from "@/components/sections/Rooms";
import { Gallery } from "@/components/sections/Gallery";
import { Intermission } from "@/components/sections/Intermission";
import { Experiences } from "@/components/sections/Experiences";
import { Reviews } from "@/components/sections/Reviews";
import { Location } from "@/components/sections/Location";
import { FAQ } from "@/components/sections/FAQ";
import { BookingCTA } from "@/components/sections/BookingCTA";
import { Footer } from "@/components/sections/Footer";
import { Marquee } from "@/components/ui/Marquee";
import { PageIntro } from "@/components/ui/PageIntro";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { SectionRail } from "@/components/ui/SectionRail";
import { FloatingActions } from "@/components/ui/FloatingActions";
import { StickyBookingDock } from "@/components/ui/StickyBookingDock";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqPageJsonLd } from "@/lib/seo";

const MARQUEE_ITEMS = [
  "06° 56′ N · 80° 47′ E",
  "Elev. 1,868 m",
  "16°C · mist by dawn",
  "Est. 2020 · Nuwara Eliya",
  "Three bedrooms · one cabana",
  "85 Badulla Road",
  "Kettle on by six",
  "Fire lit by seven",
  "Stars by nine",
  "Tea fields east · lake south",
];

export default function HomePage() {
  return (
    <>
      <PageIntro />
      <ScrollProgress />
      <SectionRail />
      <Navbar />
      <main>
        <Hero />
        <Marquee items={MARQUEE_ITEMS} speed="med" tone="dark" />
        <About />
        <Rooms />
        <Gallery />
        <Intermission />
        <Experiences />
        <Reviews />
        <Location />
        <FAQ />
        <BookingCTA />
      </main>
      <Footer />
      <FloatingActions />
      <StickyBookingDock />
      <JsonLd id="ld-faq" data={faqPageJsonLd()} />
    </>
  );
}
