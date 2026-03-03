import { Link } from "react-router-dom";
import { AppRoute } from "../../const";
type PlaceCardProps = {
  id: string;
  title: string;
  type: string;
  price: number;
  isPremium: boolean;
  isFavorite: boolean;
  previewImage: string;
  rating: number;


  cardClassName: string;
  imgWrapperClass: string;
  imgWidth: number;
  imgHeight: number;

  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

function PlaceCard({
  id,
  title,
  type,
  price,
  isPremium,
  isFavorite,
  previewImage,
  rating,
  cardClassName,
  imgWrapperClass,
  imgWidth,
  imgHeight,
  onMouseEnter,
  onMouseLeave
}: PlaceCardProps) {
  const ratingPercent = Math.round(rating * 20);

  return (
    <article
      className={`${cardClassName} place-card`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}

      <div className={`${imgWrapperClass} place-card__image-wrapper`}>
        <Link to={`${AppRoute.Offer}/${id}`}>
          <img
            className="place-card__image"
            src={previewImage}
            width={imgWidth}
            height={imgHeight}
            alt="Place image"
          />
        </Link>
      </div>

      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">€{price}</b>
            <span className="place-card__price-text">/ night</span>
          </div>
        </div>

        <button className={`place-card__bookmark-button button ${isFavorite ? 'place-card__bookmark-button--active' : ''}`} type="button">
          <svg className="place-card__bookmark-icon" width="18" height="19">
              <use href="/img/sprite.svg#icon-bookmark"></use>
           </svg>
            <span className="visually-hidden">To bookmarks</span>
        </button>

        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: `${ratingPercent}%` }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>

        <h2 className="place-card__name">
          <Link to={`${AppRoute.Offer}/${id}`}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}

export { PlaceCard };
