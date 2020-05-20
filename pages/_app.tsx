import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { Flex, Grid, Avatar, Box } from '@primer/components';
import { ThemeProvider } from 'styled-components';

import { Link } from '@atoms/Link';
import { Logo } from '@atoms/Logo';

import { Menu } from '@components/Menu';

import { GlobalStyles } from '@styled/index';
import { theme } from '@styled/theme';

export default class Troup extends App {
    state = {
        user: true,
    };

    render(): JSX.Element {
        const { Component } = this.props;
        const isLoggedIn = !!this.state.user;

        return (
            <>
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css?family=DM+Sans:400,700|Lato:400,700&display=swap"
                        rel="stylesheet"
                    />
                    <link rel="shortcut icon" href="/favicon.ico" />
                </Head>
                <ThemeProvider theme={theme}>
                    <GlobalStyles />
                    <Grid gridTemplateRows="max-content auto" height="100%">
                        <Flex as="header" alignItems="center" justifyContent="space-between" p={2}>
                            <Link href="/">
                                <Logo />
                            </Link>
                            {isLoggedIn && (
                                <Avatar
                                    src="https://avatars.githubusercontent.com/primer"
                                    size={45}
                                />
                            )}

                            {!isLoggedIn && <Menu />}
                        </Flex>
                        <Box sx={{ position: 'relative', top: 0, left: 0 }}>
                            <Component />
                        </Box>
                    </Grid>
                </ThemeProvider>
            </>
        );
    }
}
