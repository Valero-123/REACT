import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { NotFoundPage } from '../pages/not-found-page/not-found-page';
import { renderWithProviders } from './render-with-providers';
import { AppRoute } from '../const';

describe('NotFoundPage', () => {
  const renderPage = () => renderWithProviders(<NotFoundPage />);

  it('отображает номер ошибки 404', () => {
    renderPage();
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('отображает текст на английском', () => {
    renderPage();
    expect(screen.getByText(/Sorry, the page you are looking for does not exist/i)).toBeInTheDocument();
  });

  it('ссылка на главную страницу присутствует', () => {
    renderPage();
    expect(screen.getByRole('link', { name: /Go back to main page/i })).toBeInTheDocument();
  });

  it('ссылка ведет на главную страницу', () => {
    renderPage();
    const link = screen.getByRole('link', { name: /Go back to main page/i });
    expect(link).toHaveAttribute('href', AppRoute.Main);
  });
});