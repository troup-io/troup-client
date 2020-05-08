import jwtDecode from 'jwt-decode';
import Cookie from 'js-cookie';
import Router from 'next/router';

export type DecodedToken = {
    readonly userId: string;
    readonly expiry: number;
};

export class AuthToken {
    readonly decodedToken: DecodedToken;

    constructor(readonly token: string) {
        this.decodedToken = { userId: '', expiry: 0 };

        try {
            console.log('token', !!token);
            this.decodedToken = jwtDecode(token);
        } catch (e) {
            console.warn('Invalid or bad token.', token);
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
        Cookie.set('token', token, { expires: 7 });
        await Router.push('/');
    }
}
