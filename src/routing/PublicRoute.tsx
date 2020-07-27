import React from 'react';
import { useLocation, Route, Navigate } from 'react-router-dom';

import { useAuth } from 'hooks/useAuth';
import { Location } from 'history';

export const PublicRoute: React.FC<any> = (props) => {
    const location = useLocation() as Location<{ from?: string }>;
    const { authenticated } = useAuth();
    const isSamePath = location.pathname === location.state?.from;
    return !authenticated ? (
        <Route {...props} />
    ) : (
        <Navigate to={isSamePath ? '/' : location.state?.from || '/'} />
    );
};
