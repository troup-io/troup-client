import React from 'react';
import NextLink, { LinkProps } from 'next/link';

export const Link: React.FC<LinkProps> = ({ children, ...rest }) => {
    return (
        <NextLink {...rest}>
            <a>{children}</a>
        </NextLink>
    );
};
