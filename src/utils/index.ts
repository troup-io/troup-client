import { ApolloError } from '@apollo/client';
import Cookies from 'js-cookie';
import { Location } from 'history';
import moment from 'moment';

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

export function extractTeamNameFromURL(location: Location): string | null {
    return location.pathname.split('/')[1] ?? null;
}

export function formUrl(path: 'login' | 'dashboard', redirected?: boolean): string {
    let pathname = null;

    switch (path) {
        case 'login': {
            pathname = '/login';
            break;
        }

        case 'dashboard':
        default: {
            pathname = '/';
            break;
        }
    }

    return [pathname, redirected ? '?redirected=true' : ''].join('');
}

export function errorParser(error: ApolloError | undefined): ApolloError | undefined {
    if (error && error.message) {
        error.message = error.message.replace(/^((graphql|network)\s*error\s*:\s*)/gi, '');

        if (error.message.includes('status code 400')) {
            error.message = 'Internal server error.';
        }
    }

    return error;
}

export function getTokenFromCookie(): string | null {
    return Cookies.get('token') || null;
}

export function extractSize(size: string): [number, string?] {
    const unit = size.match(/\D+$/)?.pop();
    const value = parseFloat(size.split(/\D+$/)[0]);
    return [value, unit];
}

export function embedToken(token?: string): any {
    return {
        context: {
            headers: {
                authorization: `Bearer ${token}`,
            },
        },
    };
}

export function dateDifference(date: string): string {
    const d = moment(date);

    if (d.diff(Date.now(), 'days') > 7) {
        return `on ${d.format('D MMM YYYY')}`;
    }

    return d.fromNow();
}
