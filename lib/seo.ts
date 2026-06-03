import { site } from "@/data/site";
import { rooms } from "@/data/rooms";
import { reviews, reviewSummary } from "@/data/reviews";
import { faqs } from "@/data/faqs";
import { gallery } from "@/data/gallery";

const abs = (origin: string, path: string) =>
  path.startsWith("http") ? path : `${origin}${path.startsWith("/") ? "" : "/"}${path}`;

const onlyDigits = (s: string) => s.replace(/[^\d+]/g, "");

export function websiteJsonLd(origin: string): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${origin}/#website`,
    url: origin,
    name: site.name,
    description: site.tagline,
    inLanguage: "en",
    publisher: { "@id": `${origin}/#lodging` },
  };
}

export function lodgingBusinessJsonLd(origin: string): Record<string, unknown> {
  const room = rooms[0]!;
  const images = gallery.slice(0, 6).map((g) => abs(origin, g.src));

  const amenityFeature = room.amenities.map((a) => ({
    "@type": "LocationFeatureSpecification",
    name: a.label,
    value: true,
  }));

  const reviewNodes = reviews.map((r) => ({
    "@type": "Review",
    reviewRating: {
      "@type": "Rating",
      ratingValue: r.rating,
      bestRating: 5,
    },
    author: { "@type": "Person", name: r.author },
    reviewBody: r.quote,
  }));

  return {
    "@context": "https://schema.org",
    "@type": ["LodgingBusiness", "Hotel"],
    "@id": `${origin}/#lodging`,
    name: site.name,
    alternateName: "Dreamers Den Cabana",
    description: room.description,
    slogan: site.tagline,
    url: origin,
    image: images,
    logo: abs(origin, "/images/logo.svg"),
    telephone: onlyDigits(site.phone),
    email: site.email,
    priceRange: "$$",
    currenciesAccepted: "LKR, USD, EUR, GBP",
    paymentAccepted: "Cash, Credit Card",
    address: {
      "@type": "PostalAddress",
      streetAddress: "85 Badulla Road",
      addressLocality: "Nuwara Eliya",
      postalCode: "22200",
      addressRegion: "Central Province",
      addressCountry: "LK",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.coords.lat,
      longitude: site.coords.lng,
    },
    hasMap: `https://www.google.com/maps?q=${site.coords.lat},${site.coords.lng}`,
    sameAs: [site.facebook, site.instagram],
    checkinTime: "14:00",
    checkoutTime: "11:00",
    petsAllowed: false,
    smokingAllowed: false,
    numberOfRooms: 3,
    numberOfBedrooms: 3,
    maximumAttendeeCapacity: 6,
    amenityFeature,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: reviewSummary.score,
      reviewCount: reviewSummary.count,
      bestRating: 5,
      worstRating: 1,
    },
    review: reviewNodes,
    potentialAction: {
      "@type": "ReserveAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: site.bookingUrl,
        actionPlatform: [
          "https://schema.org/DesktopWebPlatform",
          "https://schema.org/MobileWebPlatform",
        ],
      },
      result: { "@type": "LodgingReservation", name: "Booking at Dreamers Den" },
    },
    containedInPlace: {
      "@type": "Place",
      name: "Nuwara Eliya, Central Province, Sri Lanka",
    },
  };
}

export function faqPageJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
