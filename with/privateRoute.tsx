import React, { Component } from 'react';
import { NextPageContext } from 'next';
import { Cookie as NextCookie } from 'next-cookie';
import Cookie from 'js-cookie';

import { AuthToken, AuthProps } from '../interfaces/auth.interfaces';

import { redirectToLogin } from '../services/Redirect';

export function withPrivateRoute(WrappedComponent: any): React.ComponentType<AuthProps> {
    return class PrivateRoute extends Component<AuthProps> {
        static getInitialProps(ctx: NextPageContext): AuthProps {
            const token = new NextCookie(ctx).get('token') as string;
            const auth = new AuthToken(token);
            const initialProps = { auth };

            if (auth.isExpired) {
                redirectToLogin(ctx.res);
            }

            if (WrappedComponent.getInitialProps) {
                return WrappedComponent.getInitialProps(initialProps);
            }

            return initialProps;
        }

        get auth(): AuthToken | null {
            const token = this.props.auth?.token || Cookie.get('token');
            return new AuthToken(token);
        }

        render(): JSX.Element {
            return <WrappedComponent auth={this.auth} {...this.props} />;
        }
    };
}
