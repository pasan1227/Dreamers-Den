import type { Review, ReviewSummary } from "@/lib/types";

export const reviewSummary: ReviewSummary = {
  score: "9.4",
  label: "Superb",
  count: 6,
  source: "Verified",
};

export const reviews: ReadonlyArray<Review> = [
  {
    id: "r-1",
    quote:
      "We woke to mist in the garden every morning. The little kitchen made it feel like our own home in the hills.",
    author: "Anika & Rehan",
    initial: "A",
    location: "Colombo",
    type: "couple",
    rating: 5,
  },
  {
    id: "r-2",
    quote:
      "Spotless, quiet and so warm at night. The host's check-in was the friendliest welcome we've had in Sri Lanka.",
    author: "Marta L.",
    initial: "M",
    location: "Germany",
    type: "couple",
    rating: 5,
  },
  {
    id: "r-3",
    quote:
      "Five minutes from town yet wrapped in green. We'd come back just for the evenings in the hot tub.",
    author: "James & Priya",
    initial: "J",
    location: "UK",
    type: "honeymoon",
    rating: 5,
  },
];
