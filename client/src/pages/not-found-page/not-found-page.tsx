import React from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../../components/header/header';
import { AppRoute } from '../../const';

function NotFoundPage() {
    return (
        <div className="page page--gray page--not-found">
            <Header />
            
            <main className="page__main page__main--not-found">
                <div className="container">
                    <section className="not-found">
                        {/* Номер 404 белым цветом в левом верхнем углу */}
                        <div className="not-found__error-code">404</div>
                        
                        <div className="not-found__image-container">
                            <img 
                                src="/img/404-error.jpg" 
                                alt="Page not found" 
                                className="not-found__image"
                                onError={(e) => {
                                    // Если картинка не загрузится, покажем заглушку
                                    e.currentTarget.style.display = 'none';
                                }}
                            />
                        </div>
                        
                        <h1 className="not-found__title visually-hidden">404. Page not found</h1>
                        
                        <p className="not-found__text">
                            Sorry, the page you are looking for does not exist.
                        </p>
                        
                        <Link to={AppRoute.Main} className="not-found__link button">
                            Go back to main page
                        </Link>
                    </section>
                </div>
            </main>
        </div>
    );
}

export { NotFoundPage };