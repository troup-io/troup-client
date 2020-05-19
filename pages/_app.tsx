import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'styled-components';
import Link from 'next/link';
import { Flex, Grid, Avatar } from '@primer/components';

import { GlobalStyles } from '@styled/index';
import { theme } from '@styled/theme';

import Logo from '@images/logo-original.svg';
import { Menu } from '@components/Menu';

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
                </Head>
                <ThemeProvider theme={theme}>
                    <GlobalStyles />
                    <Grid gridTemplateRows="75px auto" height="100%">
                        <Flex as="header" alignItems="center" justifyContent="space-between" p={2}>
                            <Link href="/">
                                <img src={Logo} alt="troup-logo" width={125} />
                            </Link>
                            {isLoggedIn && (
                                <Avatar
                                    src="https://avatars.githubusercontent.com/primer"
                                    size={45}
                                />
                            )}

                            {!isLoggedIn && <Menu />}
                        </Flex>
                        <div style={{ height: '100%', flexShrink: 1 }}>
                            <Component />
                        </div>
                    </Grid>
                </ThemeProvider>
            </>
        );
    }
}
