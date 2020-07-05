import React, { useEffect } from 'react';
import { gql } from '@apollo/client';
import Router from 'next/router';
import styled from 'styled-components';

import { useQuery } from '@hooks/useQuery';

import { Loading } from '@molecules/Loading';

import { DefaultError } from '@components/DefaultError';

const GET_ALL_TEAMS = gql`
    query GET_ALL_TEAMS {
        teams {
            name
        }
    }
`;

const DashboardWrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    flex-shrink: 1;
`;

export const DashboardRedirect: React.FC = () => {
    const { data, error, loading } = useQuery(GET_ALL_TEAMS);

    useEffect(() => {
        if (data) {
            Router.push(`/${data[0].name}/projects`);
        }
    }, [data]);

    if (loading) {
        return <Loading opacify fixed />;
    }

    if (error) {
        return (
            <DashboardWrapper>
                <DefaultError status={500} message={error.message} />
            </DashboardWrapper>
        );
    }

    return null;
};
