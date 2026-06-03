import type { SiteConfig } from "@/lib/types";

export const site: SiteConfig = {
  name: "Dreamers Den",
  tagline: "A wooden retreat among Sri Lanka's tea-clad hills",
  established: "Est. 2020",
  location: "Nuwara Eliya · Sri Lanka",
  address: "85 Badulla Road, 22200 Nuwara Eliya, Central Province, Sri Lanka",
  phone: "+94 76 210 2942",
  whatsapp: "+94 76 210 2942",
  whatsappUrl:
    "https://wa.me/94762102942?text=Hello%20Dreamers%20Den%2C%20I%27d%20like%20to%20book%20a%20stay.",
  bookingUrl: "https://www.booking.com/hotel/lk/dreamers-den-nuwara-eliya5.html",
  email: "askdreamsden@gmail.com",
  facebook: "https://www.facebook.com/p/Dreamers-Den-Cabana-61574596395929/",
  instagram: "https://www.instagram.com/dreamers_.den/",
  mapEmbed:
    "https://maps.google.com/maps?q=Dreamers+Den,+Nuwara+Eliya&ll=6.9505542,80.7892829&z=16&output=embed",
  coords: { lat: 6.9505542, lng: 80.7892829 },
  nav: [
    { label: "Story", href: "#about" },
    { label: "The Cabana", href: "#rooms" },
    { label: "Gallery", href: "#gallery" },
    { label: "Experiences", href: "#experiences" },
    { label: "Find Us", href: "#location" },
  ],
};
