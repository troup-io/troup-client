import React from 'react';
import { NextPageContext } from 'next';

import { AuthToken } from '@services/Auth';
import { redirectToDashboard } from '@services/Redirect';

import { getTokenFromCookie } from '@utils';

export function withRedirectUser(Component): any {
    const hocComponent = (props) => <Component {...props} />;

    hocComponent.getInitialProps = async (ctx: NextPageContext): Promise<any> => {
        const token = getTokenFromCookie(ctx);
        const auth = new AuthToken(token);
        const initialProps = { auth };

        if (auth.isAuthenticated && /signup|login/i.test(ctx.pathname)) {
            redirectToDashboard(ctx.res);
        }

        if (Component.getInitialProps) {
            const innerProps = await Component.getInitialProps(initialProps);
            return { ...innerProps, ...initialProps };
        }

        return initialProps;
    };

    return hocComponent;
}
