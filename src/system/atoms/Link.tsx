import React from 'react';
import NextLink, { LinkProps } from 'next/link';

export const Link: React.FC<LinkProps> = ({ children, ...rest }) => {
    const { href, as, replace, scroll, shallow, passHref, prefetch, ...elementProps } = rest;

    return (
        <NextLink
            href={href}
            as={as}
            replace={replace}
            scroll={scroll}
            shallow={shallow}
            passHref={passHref}
            prefetch={prefetch}
        >
            <a {...elementProps}>{children}</a>
        </NextLink>
    );
};
