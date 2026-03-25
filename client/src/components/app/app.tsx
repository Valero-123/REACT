import { MainPage } from "../../pages/main-page/main-page";
import { NotFoundPage } from "../../pages/not-found-page/not-found-page";
import { FavoritesPage } from "../../pages/favorites-page/favorites-page";
import { LoginPage } from "../../pages/login-page/login-page";
import { OfferPage } from "../../pages/offer-page/offer-page";
import { LoadingPage } from "../../pages/loading-page/loading-page";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "../private-route/private-route";
import { useAppSelector } from "../../hooks";
import { AppRoute } from "../../const";
import { getIsAuthUnknown, getIsOffersDataLoading } from "../../store/selectors";

// Создаем отдельный компонент для маршрутов
function AppRoutes() {
  const isOffersDataLoading = useAppSelector(getIsOffersDataLoading);
  const isAuthUnknown = useAppSelector(getIsAuthUnknown);

  // Показываем загрузку, пока не знаем статус авторизации или грузятся данные
  if (isAuthUnknown || isOffersDataLoading) {
    return <LoadingPage />;
  }

  return (
    <Routes>
      <Route path={AppRoute.Main} element={<MainPage />} />
      <Route
        path={AppRoute.Favorites}
        element={
          <PrivateRoute>
            <FavoritesPage />
          </PrivateRoute>
        }
      />
      <Route path={AppRoute.Login} element={<LoginPage />} />
      <Route path={AppRoute.Offer} element={<OfferPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

// Главный компонент App с BrowserRouter
function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export { App };