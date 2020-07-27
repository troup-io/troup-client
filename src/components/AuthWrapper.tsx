import React from 'react';
import { Flex, Heading } from '@primer/components';

import { Link } from 'system/atoms/Link';

// TODO-ss: Handle errors gracefully for form errors.

interface AuthWrapperProps {
    pageHeading: 'Login' | 'Signup';
    children: React.ReactNode;
}

export const AuthWrapper: React.FC<AuthWrapperProps> = ({ pageHeading, children }) => {
    const isLogin = pageHeading === 'Login';

    return (
        <Flex
            flexDirection="column"
            justifyContent="center"
            maxWidth={350}
            height="100%"
            m="auto"
            p="0 20px"
        >
            <Heading fontSize={5} mb={4}>
                {pageHeading}
            </Heading>
            {children}
            {!isLogin && (
                <Flex justifyContent="center">
                    Already a user? <Link to="/login">Login now</Link>.
                </Flex>
            )}
            {isLogin && (
                <Flex justifyContent="center">
                    Not a user? <Link to="/signup">Register now</Link>.
                </Flex>
            )}
        </Flex>
    );
};
