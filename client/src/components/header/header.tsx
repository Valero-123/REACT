import { Link } from 'react-router-dom';
import { Logo } from '../logo/logo';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { getIsAuth, getUser, getUserAvatar } from '../../store/selectors';
import { logoutAction } from '../../store/api-action';
import { AppRoute } from '../../const';

function Header() {
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(getIsAuth);
  const user = useAppSelector(getUser);
  const userAvatar = useAppSelector(getUserAvatar);
  const favoritesCount = useAppSelector((state) => 
    state.offers.filter((offer) => offer.isFavorite).length
  );

  const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    dispatch(logoutAction());
  };

  // Получаем имя пользователя (если есть) или используем email
  const getUserName = (): string => {
    if (user?.name) {
      return user.name;
    }
    // Если имени нет, берем первую часть email до @
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              {isAuth ? (
                // Авторизованный пользователь
                <>
                  <li className="header__nav-item user">
                    <Link
                      to={AppRoute.Favorites}
                      className="header__nav-link header__nav-link--profile"
                    >
                      <div
                        className="header__avatar-wrapper user__avatar-wrapper"
                        style={
                          userAvatar
                            ? { backgroundImage: `url(${userAvatar})` }
                            : {}
                        }
                      >
                        <img 
                          src={userAvatar || '/img/avatar.svg'} 
                          alt={getUserName()}
                          style={{ display: 'none' }}
                        />
                      </div>
                      <span className="header__user-name user__name">
                        {getUserName()}
                      </span>
                      {favoritesCount > 0 && (
                        <span className="header__favorite-count">{favoritesCount}</span>
                      )}
                    </Link>
                  </li>
                  <li className="header__nav-item">
                    <a
                      className="header__nav-link"
                      href="#"
                      onClick={handleLogout}
                    >
                      <span className="header__signout">Sign out</span>
                    </a>
                  </li>
                </>
              ) : (
                // Гость
                <li className="header__nav-item user">
                  <Link
                    to={AppRoute.Login}
                    className="header__nav-link header__nav-link--profile"
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper"></div>
                    <span className="header__login">Sign in</span>
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export { Header };