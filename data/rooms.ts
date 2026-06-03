import type { Room } from "@/lib/types";

export const rooms: ReadonlyArray<Room> = [
  {
    id: "villa",
    name: "The A-frame Cabana",
    tagline: "Rented as one — three bedrooms, one wooden cabin",
    description:
      "Dreamers Den is taken as a whole. Three bedrooms tucked under the triangular apex, a honey-timber cathedral ceiling, polished concrete floors, a microcement bathroom, a small kitchen, and a balcony that opens onto the hill country. Built for couples and small adult groups travelling together — for a long weekend, a writing trip, or a reunion of grown-ups.",
    image: "/images/cabana/14.webp",
    imageAlt:
      "Soaring honey-timber A-frame ceiling with internal staircase, looking up the apex",
    capacity: "Up to 6 adults · 3 bedrooms · 1 bathroom · 27 m² + balcony",
    amenities: [
      { label: "Glass-front mountain view", icon: "view" },
      { label: "Fully equipped kitchen", icon: "pan" },
      { label: "Private balcony", icon: "key" },
      { label: "Free private parking", icon: "car" },
      { label: "Free Wi-Fi", icon: "wifi" },
      { label: "Daily housekeeping", icon: "leaf" },
      { label: "Sri Lankan breakfast", icon: "fork" },
    ],
  },
];
