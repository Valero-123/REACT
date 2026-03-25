import React from 'react';

function LoadingPage(): React.ReactElement {
    return (
        <div className="page page--gray page--loading">
            <main className="page__main page__main--loading">
                <div className="container">
                    <div className="loading">
                        {/* Три анимированных домика */}
                        <div className="loading__houses">
                            <div className="loading__house loading__house--1">
                                <div className="loading__house-roof"></div>
                                <div className="loading__house-body"></div>
                                <div className="loading__house-door"></div>
                                <div className="loading__house-window"></div>
                            </div>
                            
                            <div className="loading__house loading__house--2">
                                <div className="loading__house-roof"></div>
                                <div className="loading__house-body"></div>
                                <div className="loading__house-door"></div>
                                <div className="loading__house-window"></div>
                            </div>
                            
                            <div className="loading__house loading__house--3">
                                <div className="loading__house-roof"></div>
                                <div className="loading__house-body"></div>
                                <div className="loading__house-door"></div>
                                <div className="loading__house-window"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export { LoadingPage };