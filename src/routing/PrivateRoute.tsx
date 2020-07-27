import React from 'react';
import { useAuth } from 'hooks/useAuth';
import { useLocation, Route, Navigate } from 'react-router-dom';
import { RouteProps } from 'react-router';
import { Location } from 'history';

export const PrivateRoute: React.FC<RouteProps> = (props) => {
    const location = useLocation() as Location<{ from?: string }>;
    const { authenticated } = useAuth();
    return authenticated ? (
        <Route {...props} />
    ) : (
        <Navigate to="/login" replace state={{ from: location.pathname }} />
    );
};
