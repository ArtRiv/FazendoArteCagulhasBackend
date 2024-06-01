import { Review } from 'src/interfaces/review.interface';

export function getAvarageRating(reviews: Partial<Review>[]) {
  const totalRating = reviews.length;
  const sumRatings = reviews.reduce((sum, review) => sum + review.rating, 0);
  const avarageRating = totalRating > 0 ? sumRatings / totalRating : 0;
  const roundedRating = Math.round(avarageRating * 2) / 2; // Rounds to nearest 0.5

  return roundedRating;
}
