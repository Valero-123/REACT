import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { PlaceCard } from '../components/place-card/place-card';
import { renderWithProviders } from './render-with-providers';

const renderPlaceCard = (props: Partial<Parameters<typeof PlaceCard>[0]> = {}) => {
  const defaultProps = {
    id: 'offer-1',
    title: 'Test Apartment',
    type: 'apartment',
    price: 120,
    isPremium: false,
    isFavorite: false,
    previewImage: '/img/test.jpg',
    rating: 4.5,
    cardClassName: 'cities__card',
    imgWrapperClass: 'cities__image-wrapper',
    imgWidth: 260,
    imgHeight: 200,
    ...props,
  };

  // Убираем BrowserRouter, так как renderWithProviders уже содержит MemoryRouter
  return renderWithProviders(<PlaceCard {...defaultProps} />);
};

describe('CitiesCard (PlaceCard)', () => {
  it('отображает заголовок объявления на карточке', () => {
    renderPlaceCard({ title: 'Beautiful Studio in Paris' });
    expect(screen.getByText('Beautiful Studio in Paris')).toBeInTheDocument();
  });

  it('отображает цену объявления в разметке', () => {
    renderPlaceCard({ price: 250 });
    expect(screen.getByText('€250')).toBeInTheDocument();
  });

  it('отображает метку Premium когда isPremium = true', () => {
    renderPlaceCard({ isPremium: true });
    expect(screen.getByText('Premium')).toBeInTheDocument();
  });

  it('не отображает метку Premium когда isPremium = false', () => {
    renderPlaceCard({ isPremium: false });
    expect(screen.queryByText('Premium')).not.toBeInTheDocument();
  });

  it('ссылка на страницу объявления содержит id в href (/offer/id)', () => {
    renderPlaceCard({ id: 'apt-123', title: 'Test Apartment' });
    const link = screen.getByRole('link', { name: /test apartment/i });
    expect(link).toHaveAttribute('href', '/offer/apt-123');
  });

  it('отображает рейтинг в процентах', () => {
    renderPlaceCard({ rating: 3.5 });
    const stars = document.querySelector('.place-card__stars span');
    expect(stars).toHaveStyle({ width: '70%' });
  });

  it('отображает тип жилья', () => {
    renderPlaceCard({ type: 'house' });
    expect(screen.getByText('house')).toBeInTheDocument();
  });
});