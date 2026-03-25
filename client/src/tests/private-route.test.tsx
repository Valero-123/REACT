import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from '../components/private-route/private-route';
import { AuthorizationStatus, AppRoute } from '../const';
import { renderWithProviders } from './render-with-providers';

type AuthStatus = typeof AuthorizationStatus[keyof typeof AuthorizationStatus];

function renderPrivateRoute(status: AuthStatus) {
  return renderWithProviders(
    <Routes>
      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute authorizationStatus={status}>
            <div data-testid="protected">Избранное</div>
          </PrivateRoute>
        }
      />
      <Route
        path={AppRoute.Login}
        element={<div data-testid="login-page">Страница входа</div>}
      />
    </Routes>,
    {
      initialEntries: [AppRoute.Favorites],
      storeOverrides: {
        authorizationStatus: status,
      },
    }
  );
}

describe('PrivateRoute', () => {
  it('показывает дочерний компонент для авторизованного пользователя', () => {
    renderPrivateRoute(AuthorizationStatus.Auth);
    expect(screen.getByTestId('protected')).toBeInTheDocument();
    expect(screen.queryByTestId('login-page')).not.toBeInTheDocument();
  });

  it('перенаправляет на /login для неавторизованного пользователя', () => {
    renderPrivateRoute(AuthorizationStatus.NoAuth);
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
    expect(screen.queryByTestId('protected')).not.toBeInTheDocument();
  });

  it('перенаправляет на /login при статусе Unknown', () => {
    renderPrivateRoute(AuthorizationStatus.Unknown);
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
  });
});