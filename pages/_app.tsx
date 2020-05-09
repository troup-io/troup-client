import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';

import { GlobalStyles } from '../styled';
import { theme } from '../styled/theme';

export default class Troup extends App {
    render(): JSX.Element {
        const { Component } = this.props;
        return (
            <>
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css?family=DM+Sans:400,700|Lato:400,700&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <ThemeProvider theme={theme}>
                    <GlobalStyles />
                    <Component />
                </ThemeProvider>
            </>
        );
    }
}
