import React from 'react';
import { gql } from '@apollo/client';

import { GetAllTeams_teams } from 'server-types/GetAllTeams';

import { useQuery } from 'hooks/useQuery';

import { Link } from 'system/atoms/Link';

import { Loading } from 'system/molecules/Loading';

import { DefaultError } from 'components/DefaultError';

const GET_ALL_TEAMS = gql`
    query GetAllTeams {
        teams {
            id
            name
        }
    }
`;

export const Dashboard: React.FC = () => {
    const { data, error, loading } = useQuery<GetAllTeams_teams[]>(GET_ALL_TEAMS);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <DefaultError status={500} message={error.message} />;
    }

    return (
        <>
            {data?.map((team) => (
                <Link key={team.id} to={`/${team.name}`} replace>
                    {team.name}
                </Link>
            )) || <span>No teams!</span>}
        </>
    );
};
