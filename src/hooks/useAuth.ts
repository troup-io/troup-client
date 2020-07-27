import { useState, useRef, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Cookie from 'js-cookie';

import { StatefulLocation } from 'data/interfaces';

interface UseAuthInterface {
    token?: string | null;
    authenticated: boolean;
    login(token: string): void;
    logout(): void;
}

export const useAuth = (): UseAuthInterface => {
    const [token, setToken] = useState(Cookie.get('token') ?? null);
    const authenticated = useMemo(() => !!token, [token]);
    const navigate = useNavigate();
    const location = useLocation() as StatefulLocation;

    const login = useRef((token: string) => {
        Cookie.set('token', token, { expires: 7, sameSite: 'strict' });
        setToken(token);
        navigate(location.state.from || '/');
    });

    const logout = useRef(() => {
        Cookie.remove('token');
        setToken(null);
        navigate('/login');
    });

    return {
        token,
        authenticated,
        login: login.current,
        logout: logout.current,
    };
};
