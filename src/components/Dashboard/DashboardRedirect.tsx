import React, { useEffect } from 'react';
import { gql } from '@apollo/client';
import Router from 'next/router';
import styled from 'styled-components';

import { GET_PROJECTS } from '@queries';

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
    const { data: teamData, error: teamError, loading: teamLoading } = useQuery(GET_ALL_TEAMS);
    const { data: projectData, error: projectError, loading: projectLoading } = useQuery(
        GET_PROJECTS
    );

    const loading = teamLoading || projectLoading;
    const error = teamError || projectError;

    useEffect(() => {
        if (teamData && projectData) {
            Router.push(`/${teamData[0].name}/projects/${projectData[0].sequence}`);
        }
    }, [teamData, projectData]);

    if (loading) {
        return <Loading opacify />;
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
