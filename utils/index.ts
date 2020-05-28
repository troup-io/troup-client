import { ApolloError } from '@apollo/client';
import Cookies from 'js-cookie';
import { Cookie as NextCookies } from 'next-cookie';

import { AuthToken } from '@services/Auth';
import { NextPageContext } from 'next';

export async function logout(): Promise<void> {
    await AuthToken.removeToken();
}

export function popSingular<T>(data: T): T {
    if (data) {
        const dataValues = Object.values(data);

        if (dataValues.length === 1) {
            return dataValues.pop() as T;
        }

        return data;
    }

    return data;
}

export function formUrl(
    path: 'login' | 'dashboard',
    teamName?: string | string[],
    redirected?: boolean
): string {
    let pathname = null;

    switch (path) {
        case 'login': {
            pathname = teamName ? `/${teamName}/login` : '/login';
            break;
        }

        case 'dashboard':
        default: {
            pathname = teamName ? `/${teamName}` : '/';
            break;
        }
    }

    return [pathname, redirected ? '?redirected=true' : ''].join('');
}

export function errorParser(error: ApolloError): ApolloError {
    if (error && error.message) {
        error.message = error.message.replace(/^((graphql|network)\s*error\s*:\s*)/gi, '');

        if (error.message.includes('status code 400')) {
            error.message = 'Internal server error.';
        }
    }
    return error;
}

export function getTokenFromCookie(ctx?: NextPageContext): string {
    return typeof window !== 'undefined' ? Cookies.get('token') : new NextCookies(ctx).get('token');
}
