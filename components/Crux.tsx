import React, { useMemo } from 'react';
import { useRouter } from 'next/router';
import DefaultError from 'next/error';

import { GET_USER_DETAILS, GET_TEAM_BY_NAME } from '@queries';

import { CruxContext, CruxContextType } from '@services/CruxContext';

import { useQuery } from '@hooks/useQuery';

import { Loading } from '@molecules/Loading';

export const Crux: React.FC = ({ children }) => {
    const {
        query: { team: name },
    } = useRouter();
    const { data: user, error: userError, loading: userLoading } = useQuery(GET_USER_DETAILS);
    const { data: team, error: teamError, loading: teamLoading } = useQuery(GET_TEAM_BY_NAME, {
        variables: {
            name,
        },
        skip: !name,
    });

    const cruxData = useMemo<CruxContextType>(
        () => ({
            user,
            team,
        }),
        [user, team]
    );

    if (userLoading || teamLoading) {
        return <Loading opacify />;
    }

    if (userError || teamError) {
        return <DefaultError statusCode={500} />;
    }

    return <CruxContext.Provider value={cruxData}>{children}</CruxContext.Provider>;
};
