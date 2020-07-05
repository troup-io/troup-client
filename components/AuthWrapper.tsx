import React from 'react';
import Head from 'next/head';
import { Flex, Heading } from '@primer/components';

import { Link } from '@atoms/Link';

// TODO-ss: Handle errors gracefully for form errors.

export const AuthWrapper: React.FC<{
    pageHeading: 'Login' | 'Signup';
}> = ({ pageHeading, children }) => {
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
            <Head>
                <title>{pageHeading} - Troup</title>
                <meta name="title" content={pageHeading} />
                <meta name="description" content="Description to go with OG:Title" />
            </Head>
            <Heading fontSize={5} mb={4}>
                {pageHeading}
            </Heading>
            {children}
            {!isLogin && (
                <Flex justifyContent="center">
                    Already a user? <Link href="/login">Login now</Link>.
                </Flex>
            )}
            {isLogin && (
                <Flex justifyContent="center">
                    Not a user? <Link href="/signup">Register now</Link>.
                </Flex>
            )}
        </Flex>
    );
};
