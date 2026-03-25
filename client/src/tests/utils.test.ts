import { describe, it, expect } from 'vitest';
import { 
  getOffersByCity, 
  sortOffersByType, 
  getCity,
  getFavoritesOffers,
  getFavoritesLength
} from '../utils';
import { makeFakeOffer } from './mocks';
import { SortOffersType, CITIES_LOCATION } from '../const';
import type { SortOffer } from '../types/sort';

describe('getOffersByCity', () => {
  it('возвращает только объявления указанного города', () => {
    const paris = CITIES_LOCATION[0];
    const cologne = CITIES_LOCATION[1];
    const parisOffer = { ...makeFakeOffer(), city: paris };
    const cologneOffer = { ...makeFakeOffer(), city: cologne };

    const result = getOffersByCity('Paris', [parisOffer, cologneOffer]);

    expect(result).toHaveLength(1);
    expect(result?.[0]?.city.name).toBe('Paris');
  });

  it('возвращает пустой массив, если город не найден', () => {
    const offers = [makeFakeOffer(), makeFakeOffer()];
    expect(getOffersByCity('Tokyo', offers)).toHaveLength(0);
  });

  it('возвращает пустой массив при пустом списке предложений', () => {
    expect(getOffersByCity('Paris', [])).toEqual([]);
  });
});

describe('sortOffersByType', () => {
  it('сортирует от дешёвых к дорогим (PriceToHigh)', () => {
    const offers = [
      { ...makeFakeOffer(), price: 300 },
      { ...makeFakeOffer(), price: 100 },
      { ...makeFakeOffer(), price: 200 },
    ];

    const result = sortOffersByType([...offers], SortOffersType.PriceToHigh as SortOffer);

    expect(result[0].price).toBe(100);
    expect(result[2].price).toBe(300);
  });

  it('сортирует от дорогих к дешёвым (PriceToLow)', () => {
    const offers = [
      { ...makeFakeOffer(), price: 100 },
      { ...makeFakeOffer(), price: 300 },
    ];

    const result = sortOffersByType([...offers], SortOffersType.PriceToLow as SortOffer);

    expect(result[0].price).toBe(300);
  });

  it('сортирует по рейтингу (TopRated)', () => {
    const offers = [
      { ...makeFakeOffer(), rating: 3 },
      { ...makeFakeOffer(), rating: 5 },
      { ...makeFakeOffer(), rating: 4 },
    ];

    const result = sortOffersByType([...offers], SortOffersType.TopRated as SortOffer);

    expect(result[0].rating).toBe(5);
    expect(result[2].rating).toBe(3);
  });

  it('сохраняет порядок при сортировке Popular', () => {
    const offers = [
      { ...makeFakeOffer(), price: 300 },
      { ...makeFakeOffer(), price: 100 },
      { ...makeFakeOffer(), price: 200 },
    ];

    const result = sortOffersByType([...offers], SortOffersType.Popular as SortOffer);

    expect(result[0].price).toBe(300);
    expect(result[1].price).toBe(100);
    expect(result[2].price).toBe(200);
  });

  it('не изменяет исходный массив', () => {
    const offers = [
      { ...makeFakeOffer(), price: 100 },
      { ...makeFakeOffer(), price: 200 },
    ];

    const copy = [...offers];

    sortOffersByType(offers, SortOffersType.PriceToHigh as SortOffer);

    expect(offers).toEqual(copy);
  });
  
  it('корректно работает при пустом массиве', () => {
    const result = sortOffersByType([], SortOffersType.PriceToHigh as SortOffer);
    expect(result).toEqual([]);
  });
});

describe('getCity', () => {
  it('возвращает город по названию', () => {
    const result = getCity('Paris', CITIES_LOCATION);
    expect(result?.name).toBe('Paris');
  });

  it('возвращает undefined, если город не найден', () => {
    const result = getCity('Tokyo', CITIES_LOCATION);
    expect(result).toBeUndefined();
  });

  it('работает регистронезависимо', () => {
    const result = getCity('paris', CITIES_LOCATION);
    expect(result?.name).toBe('Paris');
  });
});

describe('getFavoritesOffers', () => {
  it('возвращает только избранные предложения', () => {
    const offers = [
      { ...makeFakeOffer(), isFavorite: true },
      { ...makeFakeOffer(), isFavorite: false },
      { ...makeFakeOffer(), isFavorite: true },
    ];

    const result = getFavoritesOffers(offers);

    expect(result).toHaveLength(2);
    expect(result?.[0]?.isFavorite).toBe(true);
    expect(result?.[1]?.isFavorite).toBe(true);
  });

  it('возвращает пустой массив, если нет избранных', () => {
    const offers = [
      { ...makeFakeOffer(), isFavorite: false },
      { ...makeFakeOffer(), isFavorite: false },
    ];

    const result = getFavoritesOffers(offers);

    expect(result).toHaveLength(0);
  });

  it('возвращает пустой массив при пустом списке', () => {
    const result = getFavoritesOffers([]);
    expect(result).toEqual([]);
  });
});

describe('getFavoritesLength', () => {
  it('возвращает количество избранных предложений', () => {
    const offers = [
      { ...makeFakeOffer(), isFavorite: true },
      { ...makeFakeOffer(), isFavorite: false },
      { ...makeFakeOffer(), isFavorite: true },
      { ...makeFakeOffer(), isFavorite: true },
    ];

    const result = getFavoritesLength(offers);

    expect(result).toBe(3);
  });

  it('возвращает 0, если нет избранных', () => {
    const offers = [
      { ...makeFakeOffer(), isFavorite: false },
      { ...makeFakeOffer(), isFavorite: false },
    ];

    const result = getFavoritesLength(offers);

    expect(result).toBe(0);
  });

  it('возвращает 0 при пустом списке', () => {
    const result = getFavoritesLength([]);
    expect(result).toBe(0);
  });
});