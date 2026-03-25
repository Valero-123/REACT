import React, { useEffect, useState } from "react";
import { Header } from "../../components/header/header";
import { useParams, useNavigate } from "react-router-dom";
import { NotFoundPage } from "../not-found-page/not-found-page";
import { ReviewsForm } from "../../components/reviews-form/reviews-form";
import { ReviewsList } from "../../components/reviews-list/reviews-list";
import Map from "../../components/map/map";
import { NearPlacesCardList } from "../../components/near-places-list/near-places-list";
import { LoadingPage } from "../loading-page/loading-page";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { 
    getCurrentOffer, 
    getIsOfferLoading, 
    getReviews, 
    getIsReviewsLoading,
    getNearbyOffers,
    getIsAuth
} from "../../store/selectors";
import { 
    fetchOfferAction, 
    fetchReviewsAction, 
    fetchNearbyOffersAction,
    postReviewAction 
} from "../../store/offer-api-action";
import { AppRoute } from "../../const";

function OfferPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [isSending, setIsSending] = useState(false);
    const [postError, setPostError] = useState<string | null>(null);
    
    const offer = useAppSelector(getCurrentOffer);
    const isOfferLoading = useAppSelector(getIsOfferLoading);
    const reviews = useAppSelector(getReviews);
    const isReviewsLoading = useAppSelector(getIsReviewsLoading);
    const nearbyOffers = useAppSelector(getNearbyOffers);
    const isAuth = useAppSelector(getIsAuth);

    useEffect(() => {
        if (id) {
            console.log('Fetching offer with id:', id);
            dispatch(fetchOfferAction(id));
            dispatch(fetchReviewsAction(id));
            dispatch(fetchNearbyOffersAction(id));
        }

        // Очистка данных при размонтировании
        return () => {
            // Можно добавить очистку если нужно
        };
    }, [id, dispatch]);

    const handleAddReview = async ({ comment, rating }: { comment: string; rating: number }) => {
        if (!id) return;
        
        if (!isAuth) {
            navigate(AppRoute.Login);
            return;
        }

        setIsSending(true);
        setPostError(null);
        
        try {
            console.log('Attempting to post review:', { offerId: id, comment, rating });
            const result = await dispatch(postReviewAction({ 
                offerId: id, 
                comment, 
                rating 
            })).unwrap();
            
            console.log('Review posted successfully:', result);
            // Форма очистится автоматически через состояние в компоненте ReviewsForm
        } catch (error: any) {
            console.error('Failed to post review:', error);
            setPostError(error || 'Failed to post review. Please try again.');
        } finally {
            setIsSending(false);
        }
    };

    if (isOfferLoading) {
        return <LoadingPage />;
    }

    if (!offer) {
        return <NotFoundPage />;
    }

    // Добавляем проверки на наличие данных
    const ratingPercent = offer.rating ? Math.round(offer.rating * 20) : 0;
    const images = offer.images || [];
    const goods = offer.goods || [];
    
    const city = offer.city?.location ? {
        lat: offer.city.location.latitude,
        lng: offer.city.location.longitude,
        zoom: offer.city.location.zoom || 13
    } : {
        lat: 48.8566,
        lng: 2.3522,
        zoom: 13
    };

    const points = [
        {
            id: offer.id,
            title: offer.title,
            lat: offer.location?.latitude || city.lat,
            lng: offer.location?.longitude || city.lng
        },
        ...nearbyOffers.map((o) => ({
            id: o.id,
            title: o.title,
            lat: o.location?.latitude || city.lat,
            lng: o.location?.longitude || city.lng
        }))
    ];

    // Сортируем отзывы по дате (сначала новые)
    const sortedReviews = [...reviews].sort((a, b) => 
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    return (
        <div className="page">
            <Header />

            <main className="page__main page__main--offer">
                <section className="offer">
                    <div className="offer__gallery-container container">
                        <div className="offer__gallery">
                            {images.length > 0 ? (
                                images.map((src, i) => (
                                    <div className="offer__image-wrapper" key={`${offer.id}-${i}`}>
                                        <img className="offer__image" src={src} alt="Photo studio" />
                                    </div>
                                ))
                            ) : (
                                <div className="offer__image-wrapper">
                                    <img className="offer__image" src="/img/room.jpg" alt="Place" />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="offer__container container">
                        <div className="offer__wrapper">
                            {offer.isPremium && (
                                <div className="offer__mark">
                                    <span>Premium</span>
                                </div>
                            )}
                            <div className="offer__name-wrapper">
                                <h1 className="offer__name">{offer.title}</h1>
                                <button 
                                    className="offer__bookmark-button button" 
                                    type="button"
                                >
                                    <svg className="offer__bookmark-icon" width="31" height="33">
                                        <use xlinkHref="#icon-bookmark"></use>
                                    </svg>
                                    <span className="visually-hidden">To bookmarks</span>
                                </button>
                            </div>
                            <div className="offer__rating rating">
                                <div className="offer__stars rating__stars">
                                    <span style={{ width: `${ratingPercent}%` }}></span>
                                    <span className="visually-hidden">Rating</span>
                                </div>
                                <span className="offer__rating-value rating__value">{offer.rating}</span>
                            </div>

                            <ul className="offer__features">
                                <li className="offer__feature offer__feature--entire">{offer.type}</li>
                                <li className="offer__feature offer__feature--bedrooms">{offer.bedrooms} Bedrooms</li>
                                <li className="offer__feature offer__feature--adults">Max {offer.maxAdults} adults</li>
                            </ul>

                            <div className="offer__price">
                                <b className="offer__price-value">€{offer.price}</b>
                                <span className="offer__price-text">&nbsp;night</span>
                            </div>

                            <div className="offer__inside">
                                <h2 className="offer__inside-title">What&apos;s inside</h2>
                                <ul className="offer__inside-list">
                                    {goods.map((item) => (
                                        <li className="offer__inside-item" key={`${offer.id}-${item}`}>{item}</li>
                                    ))}
                                </ul>
                            </div>

                            <div className="offer__host">
                                <h2 className="offer__host-title">Meet the host</h2>
                                <div className="offer__host-user user">
                                    <div className={`offer__avatar-wrapper user__avatar-wrapper ${offer.host?.isPro ? "offer__avatar-wrapper--pro" : ""}`}>
                                        <img
                                            className="offer__avatar user__avatar"
                                            src={offer.host?.avatarUrl || '/img/avatar.svg'}
                                            width="74"
                                            height="74"
                                            alt="Host avatar"
                                        />
                                    </div>
                                    <span className="offer__user-name">{offer.host?.name || 'Host'}</span>
                                    {offer.host?.isPro && <span className="offer__user-status">Pro</span>}
                                </div>
                                <div className="offer__description">
                                    <p className="offer__text">{offer.description}</p>
                                </div>
                            </div>

                            <section className="offer__reviews reviews">
                                {isReviewsLoading ? (
                                    <p>Loading reviews...</p>
                                ) : (
                                    <>
                                        <ReviewsList reviews={sortedReviews} />
                                        
                                        {postError && (
                                            <div className="reviews__error" style={{ color: 'red', marginBottom: '10px' }}>
                                                {postError}
                                            </div>
                                        )}
                                        
                                        {isAuth ? (
                                            <ReviewsForm 
                                                onSubmit={handleAddReview}
                                                isSending={isSending}
                                            />
                                        ) : (
                                            <div className="reviews__login-prompt">
                                                <p>Please <a href={AppRoute.Login}>sign in</a> to leave a review.</p>
                                            </div>
                                        )}
                                    </>
                                )}
                            </section>
                        </div>
                    </div>

                    <section className="offer__map map">
                        <Map city={city} points={points} />
                    </section>
                </section>

                <div className="container">
                    <section className="near-places places">
                        <h2 className="near-places__title">Other places in the neighbourhood</h2>
                        <NearPlacesCardList offersList={nearbyOffers || []} />
                    </section>
                </div>
            </main>
        </div>
    );
}

export { OfferPage };