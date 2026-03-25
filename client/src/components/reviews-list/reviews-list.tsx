import { Review } from "../../types/reviews";
import ReviewItem from "../review-item/review-item";

type ReviewsListProps = {
    reviews: Review[];
}

function ReviewsList({ reviews }: ReviewsListProps) {
    // Показываем только первые 10 отзывов
    const displayedReviews = reviews.slice(0, 10);

    return (
        <>
            <h2 className="reviews__title">
                Reviews · <span className="reviews__amount">{reviews.length}</span>
            </h2>
            {reviews.length === 0 ? (
                <p className="reviews__empty">No reviews yet. Be the first to share your experience!</p>
            ) : (
                <ul className="reviews__list">
                    {displayedReviews.map((review) => {
                        const reviewDate = new Date(review.date);
                        const formattedDate = reviewDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

                        return (
                            <ReviewItem
                                key={review.id}
                                avatarSrc={review.user.avatarUrl}
                                userName={review.user.name}
                                rating={review.rating}
                                text={review.comment}
                                date={formattedDate}
                                dateTime={review.date}
                            />
                        );
                    })}
                </ul>
            )}
        </>
    );
}

export { ReviewsList };