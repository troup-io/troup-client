import React from 'react';
import { NextPageContext } from 'next';

import { AuthToken } from '@services/Auth';
import { redirectToLogin } from '@services/Redirect';

import { getTokenFromCookie } from '@utils';

export function withPrivateRoute(Component): any {
    const hocComponent = (props) => <Component {...props} />;

    hocComponent.getInitialProps = async (ctx: NextPageContext): Promise<any> => {
        const token = getTokenFromCookie(ctx);
        const auth = new AuthToken(token);
        const initialProps = { auth };

        if (auth.isExpired) {
            redirectToLogin(ctx.res);
        }

        if (Component.getStaticProps) {
            const innerProps = await Component.getInitialProps(initialProps);
            return { ...innerProps, ...initialProps };
        }

        return initialProps;
    };

    return hocComponent;
}
