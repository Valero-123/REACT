import React from 'react';

type ReviewItemProps = {
    avatarSrc: string;
    userName: string;
    rating: number;
    text: string;
    date: string;
    dateTime: string;
};

function ReviewItem({ avatarSrc, userName, rating, text, date, dateTime }: ReviewItemProps) {
    // Создаем массив из 5 звезд
    const stars = Array.from({ length: 5 }, (_, i) => i + 1);

    return (
        <li className="reviews__item">
            <div className="reviews__user user">
                <div className="reviews__avatar-wrapper user__avatar-wrapper">
                    <img
                        className="reviews__avatar user__avatar"
                        src={avatarSrc}
                        width="54"
                        height="54"
                        alt="Reviews avatar"
                    />
                </div>
                <span className="reviews__user-name">
                    {userName}
                </span>
            </div>
            <div className="reviews__info">
                <div className="reviews__rating rating">
                    <div className="reviews__stars">
                        {stars.map((star) => (
                            <img
                                key={star}
                                src={star <= rating ? '/img/star-active.svg' : '/img/icon-star.svg'}
                                width="13"
                                height="12"
                                alt=""
                                style={{ display: 'inline-block', marginRight: '2px' }}
                            />
                        ))}
                    </div>
                    <span className="visually-hidden">Rating {rating}</span>
                </div>
                <p className="reviews__text">
                    {text}
                </p>
                <time className="reviews__time" dateTime={dateTime}>
                    {date}
                </time>
            </div>
        </li>
    );
}

export default ReviewItem;