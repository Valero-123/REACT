import React from 'react';
import { Navigate } from "react-router-dom";
import { AppRoute } from "../../const";
import { useAppSelector } from "../../hooks";
import { getIsAuth } from "../../store/selectors";

type PrivateRouteProps = {
    children: React.ReactElement;
    authorizationStatus?: string;
}

function PrivateRoute({ children, authorizationStatus: propStatus }: PrivateRouteProps) {
    const storeStatus = useAppSelector(getIsAuth);
    const isAuth = propStatus ? propStatus === 'AUTH' : storeStatus;

    return isAuth ? children : <Navigate to={AppRoute.Login} />;
}

export { PrivateRoute };