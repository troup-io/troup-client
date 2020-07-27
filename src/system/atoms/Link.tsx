import React from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

interface LinkProps extends RouterLinkProps {
    children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ children, ...rest }: LinkProps) => {
    return <RouterLink {...rest}>{children}</RouterLink>;
};
