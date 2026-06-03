export type IconName =
  | "wifi"
  | "tea"
  | "fire"
  | "leaf"
  | "bed"
  | "view"
  | "key"
  | "fork"
  | "car"
  | "shower"
  | "mountain"
  | "water"
  | "lake"
  | "pan";

export interface Amenity {
  readonly label: string;
  readonly icon: IconName;
}

export interface Room {
  readonly id: string;
  readonly name: string;
  readonly tagline: string;
  readonly description: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly capacity: string;
  readonly amenities: ReadonlyArray<Amenity>;
}

export interface Experience {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly distance: string;
  readonly image: string;
  readonly imageAlt: string;
  readonly icon: IconName;
}

export interface Review {
  readonly id: string;
  readonly quote: string;
  readonly author: string;
  readonly initial: string;
  readonly location: string;
  readonly type: string;
  readonly rating: 1 | 2 | 3 | 4 | 5;
}

export interface ReviewSummary {
  readonly score: string;
  readonly label: string;
  readonly count: number;
  readonly source: string;
}

export interface Faq {
  readonly id: string;
  readonly question: string;
  readonly answer: string;
}

export interface GalleryImage {
  readonly id: string;
  readonly src: string;
  readonly alt: string;
  readonly span: "tall" | "wide" | "square";
  readonly caption: string;
}

export interface NavLink {
  readonly label: string;
  readonly href: string;
}

export interface SiteConfig {
  readonly name: string;
  readonly tagline: string;
  readonly established: string;
  readonly location: string;
  readonly address: string;
  readonly phone: string;
  readonly whatsapp: string;
  readonly whatsappUrl: string;
  readonly bookingUrl: string;
  readonly email: string;
  readonly facebook: string;
  readonly instagram: string;
  readonly mapEmbed: string;
  readonly coords: { lat: number; lng: number };
  readonly nav: ReadonlyArray<NavLink>;
}
