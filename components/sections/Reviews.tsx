import { getGoogleReviews } from "@/lib/google-reviews";
import { ReviewsView } from "./ReviewsView";

export async function Reviews() {
  const { reviews, summary } = await getGoogleReviews();
  return <ReviewsView reviews={reviews} summary={summary} />;
}
