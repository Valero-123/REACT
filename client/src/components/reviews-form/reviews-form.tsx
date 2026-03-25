import React, { useState, ChangeEvent, FormEvent } from "react";

type ReviewsFormProps = {
    onSubmit: ({ comment, rating }: { comment: string; rating: number }) => void;
    isSending: boolean;
}

function ReviewsForm({ onSubmit, isSending }: ReviewsFormProps) {
    const [review, setReview] = useState("");
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);

    const handleRatingChange = (value: number) => {
        setRating(value);
    };

    const handleReviewChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setReview(e.target.value);
    };

    const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        if (rating === 0 || review.length < 50 || review.length > 300) return;

        onSubmit({ comment: review, rating });
        
        // Очищаем форму после отправки
        setReview("");
        setRating(0);
        setHoverRating(0);
    };

    const isValid = rating > 0 && review.length >= 50 && review.length <= 300;

    const getStarIcon = (starValue: number) => {
        if (hoverRating >= starValue) {
            return '/img/star-active.svg'; // Золотая при наведении
        }
        if (rating >= starValue) {
            return '/img/star-active.svg'; // Золотая при выборе
        }
        return '/img/icon-star.svg'; // Черная в остальных случаях
    };

    return (
        <form className="reviews__form form" action="#" method="post" onSubmit={handleSubmit}>
            <label className="reviews__label form__label" htmlFor="review">
                Your review
            </label>

            <div className="reviews__rating-form form__rating">
                {[5, 4, 3, 2, 1].map((num) => (
                    <React.Fragment key={num}>
                        <input
                            className="form__rating-input visually-hidden"
                            name="rating"
                            value={num}
                            id={`${num}-stars`}
                            type="radio"
                            checked={rating === num}
                            onChange={() => handleRatingChange(num)}
                            disabled={isSending}
                        />
                        <label
                            htmlFor={`${num}-stars`}
                            className="reviews__rating-label form__rating-label"
                            onMouseEnter={() => setHoverRating(num)}
                            onMouseLeave={() => setHoverRating(0)}
                            title={
                                num === 5 ? 'perfect' : 
                                num === 4 ? 'good' : 
                                num === 3 ? 'not bad' : 
                                num === 2 ? 'badly' : 'terribly'
                            }
                        >
                            <img 
                                src={getStarIcon(num)}
                                className="form__star-image" 
                                width="37" 
                                height="33" 
                                alt={`${num} stars`}
                                style={{ 
                                    filter: isSending ? 'grayscale(0.5)' : 'none',
                                    opacity: isSending ? 0.5 : 1,
                                    cursor: isSending ? 'not-allowed' : 'pointer'
                                }}
                            />
                        </label>
                    </React.Fragment>
                ))}
            </div>

            <textarea
                className="reviews__textarea form__textarea"
                id="review"
                name="review"
                placeholder="Tell how was your stay, what you like and dislike..."
                value={review}
                onChange={handleReviewChange}
                disabled={isSending}
                maxLength={300}
            ></textarea>

            <div className="reviews__button-wrapper">
                <p className="reviews__help">
                    To submit review please make sure to set{" "}
                    <span className="reviews__star">rating</span> and describe
                    your stay with at least{" "}
                    <b className="reviews__text-amount">50 characters</b>.
                </p>
                <button
                    className="reviews__submit form__submit button"
                    type="submit"
                    disabled={!isValid || isSending}
                >
                    {isSending ? 'Sending...' : 'Submit'}
                </button>
            </div>
        </form>
    );
}

export { ReviewsForm };