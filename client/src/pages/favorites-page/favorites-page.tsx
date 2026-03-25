import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/header/header';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { fetchOffersAction } from '../../store/api-action';
import { toggleFavoriteAction } from '../../store/offer-api-action';
import { AppRoute } from '../../const';
import { OffersList } from '../../types/offer';

function FavoritesPage(): React.ReactElement {
  const dispatch = useAppDispatch();
  const offersList = useAppSelector((state) => state.offers);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  
  useEffect(() => {
    if (offersList.length === 0) {
      dispatch(fetchOffersAction());
    }
  }, [dispatch, offersList.length]);

  const handleToggleFavorite = async (offerId: string, currentStatus: boolean) => {
    try {
      setUpdatingId(offerId);
      await dispatch(toggleFavoriteAction({ 
        offerId, 
        status: !currentStatus 
      })).unwrap();
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    } finally {
      setUpdatingId(null);
    }
  };

  const favoriteOffers = offersList.filter((offer) => offer.isFavorite);
  const favoritesByCity = favoriteOffers.reduce((acc, offer) => {
    const cityName = offer.city.name;
    if (!acc[cityName]) {
      acc[cityName] = [];
    }
    acc[cityName].push(offer);
    return acc;
  }, {} as Record<string, OffersList[]>);

  const citiesWithFavorites = Object.keys(favoritesByCity).sort();

  const getRatingPercent = (rating: number) => Math.round(rating * 20);

  if (favoriteOffers.length === 0) {
    return (
      <div className="page page--favorites-empty">
        <Header />
        
        <main className="page__main page__main--favorites page__main--favorites-empty">
          <div className="page__favorites-container container">
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">
                  Save properties to narrow down search or plan your future trips.
                </p>
              </div>
            </section>
          </div>
        </main>
        
        <footer className="footer">
          <Link className="footer__logo-link" to={AppRoute.Main}>
            <img 
              className="footer__logo" 
              src="/img/logo.svg" 
              alt="Rent service logo" 
              width="64" 
              height="33" 
            />
          </Link>
        </footer>
      </div>
    );
  }

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {citiesWithFavorites.map((cityName) => (
                <li key={cityName} className="favorites__locations-items">
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link className="locations__item-link" to={AppRoute.Main}>
                        <span>{cityName}</span>
                      </Link>
                    </div>
                  </div>
                  
                  <div className="favorites__places">
                    {favoritesByCity[cityName].map((offer) => (
                      <article key={offer.id} className="favorites__card place-card">
                        {offer.isPremium && (
                          <div className="place-card__mark">
                            <span>Premium</span>
                          </div>
                        )}
                        
                        <div className="favorites__image-wrapper place-card__image-wrapper">
                          <Link to={`${AppRoute.OfferBase}/${offer.id}`}>
                            <img 
                              className="place-card__image" 
                              src={offer.previewImage} 
                              width="150" 
                              height="110" 
                              alt="Place image"
                              style={{
                                objectFit: 'cover',
                                width: '150px',
                                height: '110px'
                              }}
                            />
                          </Link>
                        </div>
                        
                        <div className="favorites__card-info place-card__info">
                          <div className="place-card__price-wrapper">
                            <div className="place-card__price">
                              <b className="place-card__price-value">&euro;{offer.price}</b>
                              <span className="place-card__price-text">&#47;&nbsp;night</span>
                            </div>
                            
                            <button 
                              className={`place-card__bookmark-button button place-card__bookmark-button--active`} 
                              type="button"
                              onClick={() => handleToggleFavorite(offer.id, offer.isFavorite)}
                              disabled={updatingId === offer.id}
                            >
                              <svg className="place-card__bookmark-icon" width="18" height="19">
                                <use xlinkHref="#icon-bookmark"></use>
                              </svg>
                              <span className="visually-hidden">
                                In bookmarks
                              </span>
                            </button>
                          </div>
                          
                          <div className="place-card__rating rating">
                            <div className="place-card__stars rating__stars">
                              <span style={{ width: `${getRatingPercent(offer.rating)}%` }}></span>
                              <span className="visually-hidden">Rating</span>
                            </div>
                          </div>
                          
                          <h2 className="place-card__name">
                            <Link to={`${AppRoute.OfferBase}/${offer.id}`}>{offer.title}</Link>
                          </h2>
                          
                          <p className="place-card__type">
                            {offer.type.charAt(0).toUpperCase() + offer.type.slice(1)}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </main>
      
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img 
            className="footer__logo" 
            src="/img/logo.svg" 
            alt="Rent service logo" 
            width="64" 
            height="33" 
          />
        </Link>
      </footer>
    </div>
  );
}

export { FavoritesPage };