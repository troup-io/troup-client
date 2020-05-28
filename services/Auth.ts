import jwtDecode from 'jwt-decode';
import Cookie from 'js-cookie';
import Router from 'next/router';

import { redirectToDashboard, redirectToLogin } from './Redirect';

export type DecodedToken = {
    readonly userId: string;
    readonly expiry: number;
};

export class AuthToken {
    readonly decodedToken: DecodedToken;

    constructor(readonly token: string) {
        this.decodedToken = { userId: '', expiry: 0 };

        try {
            this.decodedToken = jwtDecode(token);
        } catch (e) {
            return;
        }
    }

    get expiresAt(): Date {
        return new Date(this.decodedToken.expiry * 1000);
    }

    get isExpired(): boolean {
        return new Date() > this.expiresAt;
    }

    get isAuthenticated(): boolean {
        return !this.isExpired;
    }

    get authorizationString(): string {
        return `Bearer ${this.token}`;
    }

    static async storeToken(token: string): Promise<void> {
        Cookie.set('token', token, { expires: 7, sameSite: 'strict' });
        await redirectToDashboard(null, Router.query.team);
    }

    static async removeToken(): Promise<void> {
        Cookie.remove('token');
        await redirectToLogin(null, Router.query.team);
    }
}
