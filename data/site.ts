import type { SiteConfig } from "@/lib/types";

export const site: SiteConfig = {
  name: "Dreamers Den",
  tagline: "A wooden retreat among Sri Lanka's tea-clad hills",
  established: "Est. 2020",
  location: "Nuwara Eliya · Sri Lanka",
  address: "85 Badulla Road, 22200 Nuwara Eliya, Central Province, Sri Lanka",
  phone: "+94 00 000 0000",
  whatsapp: "+94 00 000 0000",
  whatsappUrl:
    "https://wa.me/940000000000?text=Hello%20Dreamers%20Den%2C%20I%27d%20like%20to%20book%20a%20stay.",
  bookingUrl: "https://www.facebook.com/profile.php?id=61574596395929",
  email: "stay@dreamersden.lk",
  facebook: "https://www.facebook.com/profile.php?id=61574596395929",
  instagram: "https://instagram.com/dreamersden",
  // Embed centred on 85 Badulla Road, Nuwara Eliya — replace with the exact property pin
  mapEmbed:
    "https://www.google.com/maps?q=85+Badulla+Road+Nuwara+Eliya&output=embed",
  coords: { lat: 6.9646, lng: 80.7855 },
  nav: [
    { label: "Story", href: "#about" },
    { label: "The Cabana", href: "#rooms" },
    { label: "Gallery", href: "#gallery" },
    { label: "Experiences", href: "#experiences" },
    { label: "Find Us", href: "#location" },
  ],
};
