import React from 'react';
import { Flex, Grid, Avatar, Box } from '@primer/components';

import { Link } from '@atoms/Link';
import { Logo } from '@atoms/Logo';

import { Loading } from '@molecules/Loading';

import { Menu } from '@components/Menu';
import { DefaultError } from '@components/DefaultError';

import { getTokenFromCookie } from '@utils';

export const CruxWrapper: React.FC<{ userError: any; teamError: any; loading: boolean }> = ({
    loading,
    userError,
    teamError,
    children,
}) => {
    const isLoggedIn = getTokenFromCookie();

    const renderComponent = (): React.ReactNode => {
        if (loading) {
            return <Loading opacify />;
        }

        if (userError) {
            return <DefaultError status={500} />;
        }

        if (teamError) {
            return <DefaultError status={400} message={teamError.message} />;
        }

        return children;
    };

    return (
        <Grid gridTemplateRows="max-content auto" height="100%">
            <Flex as="header" alignItems="center" justifyContent="space-between" p={2}>
                <Link href="/">
                    <Logo />
                </Link>
                {isLoggedIn && (
                    <Avatar src="https://avatars.githubusercontent.com/primer" size={45} />
                )}

                {!isLoggedIn && <Menu />}
            </Flex>
            <Box sx={{ position: 'relative', top: 0, left: 0 }} height="100%" flexShrink={1}>
                {renderComponent()}
            </Box>
        </Grid>
    );
};
