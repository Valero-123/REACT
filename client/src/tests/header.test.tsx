import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { Header } from '../components/header/header';
import { renderWithProviders } from './render-with-providers';
import { AuthorizationStatus } from '../const';
import { makeFakeOffer } from './mocks';

const fakeUserInfo = {
  id: 'user-1',
  email: 'test@example.com',
  name: 'Test User',
  avatarUrl: 'https://example.com/avatar.jpg',
  isPro: false,
  token: 'fake-token',
};

describe('Header — неавторизованный пользователь', () => {
  it('отображает ссылку Sign in', () => {
    renderWithProviders(<Header />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });

  it('не отображает Sign out', () => {
    renderWithProviders(<Header />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });
    expect(screen.queryByText(/sign out/i)).not.toBeInTheDocument();
  });

  it('не отображает email пользователя', () => {
    renderWithProviders(<Header />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });
    expect(screen.queryByText('test@example.com')).not.toBeInTheDocument();
  });

  it('не отображает количество избранных', () => {
    renderWithProviders(<Header />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.NoAuth,
      },
    });
    expect(screen.queryByText(/\d/)).not.toBeInTheDocument();
  });
});

describe('Header — авторизованный пользователь', () => {
  it('отображает имя пользователя', () => {
    renderWithProviders(<Header />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUserInfo,
      },
    });
    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('отображает кнопку Sign out', () => {
    renderWithProviders(<Header />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUserInfo,
      },
    });
    expect(screen.getByText(/sign out/i)).toBeInTheDocument();
  });

  it('не отображает ссылку Sign in', () => {
    renderWithProviders(<Header />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUserInfo,
      },
    });
    expect(screen.queryByText(/sign in/i)).not.toBeInTheDocument();
  });

  it('отображает количество избранных предложений', () => {
    const favoriteOffers = [
      makeFakeOffer(),
      makeFakeOffer(),
      makeFakeOffer(),
    ].map(offer => ({ ...offer, isFavorite: true }));

    renderWithProviders(<Header />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUserInfo,
        offers: favoriteOffers,
      },
    });
    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('не отображает количество избранных, если избранных нет', () => {
    renderWithProviders(<Header />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.Auth,
        user: fakeUserInfo,
        offers: [],
      },
    });
    expect(screen.queryByText('0')).not.toBeInTheDocument();
    expect(screen.queryByText(/\d/)).not.toBeInTheDocument();
  });
});

describe('Header — статус Unknown', () => {
  it('отображает ссылку Sign in при статусе Unknown', () => {
    renderWithProviders(<Header />, {
      storeOverrides: {
        authorizationStatus: AuthorizationStatus.Unknown,
      },
    });
    expect(screen.getByText(/sign in/i)).toBeInTheDocument();
  });
});