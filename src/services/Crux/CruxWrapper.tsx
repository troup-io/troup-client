import React from 'react';
import { useRouter } from 'next/router';
import styled from 'styled-components';
import { Grid, Box } from '@primer/components';

import { Loading } from '@molecules/Loading';

import { DefaultError } from '@components/DefaultError';
import Sidebar from '@components/Sidebar';

const ComponentWrapper = styled(Box)`
    flex-shrink: 1;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
`;

export const CruxWrapper: React.FC<{ userError: any; teamError: any; loading: boolean }> = ({
    loading,
    userError,
    teamError,
    children,
}) => {
    const { pathname } = useRouter();
    const isInnerRoute = pathname !== '/login' && pathname !== '/signup' && pathname !== '/';

    const renderComponent = (): React.ReactNode => {
        if (loading) {
            return <Loading opacify fixed />;
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
        <Grid
            gridTemplateColumns={isInnerRoute ? 'max-content auto' : 'auto'}
            // gridTemplateRows="100%"
            height="100%"
        >
            {isInnerRoute && <Sidebar />}
            <ComponentWrapper>{renderComponent()}</ComponentWrapper>
        </Grid>
    );
};
