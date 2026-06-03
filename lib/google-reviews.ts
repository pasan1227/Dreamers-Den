import type { Review, ReviewSummary } from "@/lib/types";
import {
  reviews as fallbackReviews,
  reviewSummary as fallbackSummary,
} from "@/data/reviews";

const PLACES_ENDPOINT = "https://places.googleapis.com/v1/places";
const FIELD_MASK = "rating,userRatingCount,reviews";
const REVALIDATE_SECONDS = 60 * 60 * 24;

interface GoogleReview {
  readonly name?: string;
  readonly rating?: number;
  readonly relativePublishTimeDescription?: string;
  readonly text?: { readonly text?: string };
  readonly originalText?: { readonly text?: string };
  readonly authorAttribution?: {
    readonly displayName?: string;
    readonly photoUri?: string;
  };
}

interface PlaceDetailsResponse {
  readonly rating?: number;
  readonly userRatingCount?: number;
  readonly reviews?: ReadonlyArray<GoogleReview>;
}

export interface ReviewsData {
  readonly reviews: ReadonlyArray<Review>;
  readonly summary: ReviewSummary;
}

export async function getGoogleReviews(): Promise<ReviewsData> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;

  if (!apiKey || !placeId) {
    return { reviews: fallbackReviews, summary: fallbackSummary };
  }

  try {
    const res = await fetch(`${PLACES_ENDPOINT}/${placeId}`, {
      headers: {
        "X-Goog-Api-Key": apiKey,
        "X-Goog-FieldMask": FIELD_MASK,
      },
      next: { revalidate: REVALIDATE_SECONDS, tags: ["google-reviews"] },
    });

    if (!res.ok) {
      console.warn(
        `[google-reviews] Places API responded ${res.status} ${res.statusText}`,
      );
      return { reviews: fallbackReviews, summary: fallbackSummary };
    }

    const data = (await res.json()) as PlaceDetailsResponse;
    const mapped = mapReviews(data.reviews ?? []);

    if (mapped.length === 0) {
      return { reviews: fallbackReviews, summary: fallbackSummary };
    }

    return {
      reviews: mapped,
      summary: mapSummary(data.rating, data.userRatingCount),
    };
  } catch (err) {
    console.warn("[google-reviews] fetch failed:", err);
    return { reviews: fallbackReviews, summary: fallbackSummary };
  }
}

function mapReviews(raw: ReadonlyArray<GoogleReview>): ReadonlyArray<Review> {
  const out: Review[] = [];
  raw.forEach((r, i) => {
    const quote = r.text?.text ?? r.originalText?.text;
    const author = r.authorAttribution?.displayName;
    if (!quote || !author) return;

    out.push({
      id: r.name ?? `g-${i}`,
      quote: quote.trim(),
      author,
      initial: author.charAt(0).toUpperCase(),
      location: r.relativePublishTimeDescription ?? "",
      type: "Google",
      rating: clampRating(r.rating),
      avatarUrl: r.authorAttribution?.photoUri,
    });
  });
  return out;
}

function mapSummary(rating?: number, count?: number): ReviewSummary {
  const score = typeof rating === "number" ? rating.toFixed(1) : fallbackSummary.score;
  return {
    score,
    label: labelFor(rating),
    count: count ?? fallbackSummary.count,
    source: "Google",
  };
}

function labelFor(rating?: number): string {
  if (typeof rating !== "number") return fallbackSummary.label;
  if (rating >= 4.8) return "Exceptional";
  if (rating >= 4.5) return "Superb";
  if (rating >= 4.0) return "Wonderful";
  if (rating >= 3.5) return "Good";
  return "Pleasant";
}

function clampRating(value: number | undefined): Review["rating"] {
  const n = Math.round(value ?? 5);
  if (n <= 1) return 1;
  if (n >= 5) return 5;
  return n as 2 | 3 | 4;
}
