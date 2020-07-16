import React from 'react';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider } from 'styled-components';

import { Crux } from '@services/Crux';

import { useApollo } from '@with/apollo';

import { GlobalStyles } from '@styled/index';
import { theme } from '@styled/theme';

export default function App({ Component, pageProps }): JSX.Element {
    const {
        auth: { token },
    } = pageProps;
    const apolloClient = useApollo(pageProps.initialApolloState, token);

    return (
        <ApolloProvider client={apolloClient}>
            <Head>
                <link
                    href="https://fonts.googleapis.com/css?family=DM+Sans:400,700|Lato:400,700&display=swap"
                    rel="stylesheet"
                />
                <link rel="shortcut icon" href="/favicon.ico" />
            </Head>
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <Crux token={token}>
                    <Component />
                </Crux>
            </ThemeProvider>
        </ApolloProvider>
    );
}
