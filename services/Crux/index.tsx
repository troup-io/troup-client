import React, { useMemo } from 'react';
import { useRouter } from 'next/router';

import { GET_USER_DETAILS, GET_TEAM_BY_NAME } from '@queries';

import { CruxContext, CruxContextType } from '@services/CruxContext';

import { useQuery } from '@hooks/useQuery';

import { getTokenFromCookie } from '@utils';
import { CruxWrapper } from './CruxWrapper';

const CruxInner: React.FC = ({ children }) => {
    const hasToken = !!getTokenFromCookie();
    const {
        query: { team: name },
    } = useRouter();
    const { data: user, error: userError, loading: userLoading } = useQuery(GET_USER_DETAILS, {
        skip: !hasToken,
    });
    const { data: team, error: teamError, loading: teamLoading } = useQuery(GET_TEAM_BY_NAME, {
        variables: {
            name,
        },
        skip: !name || !hasToken,
    });

    const cruxData = useMemo<CruxContextType>(
        () => ({
            user,
            team,
        }),
        [user, team]
    );

    return (
        <CruxContext.Provider value={cruxData}>
            <CruxWrapper
                userError={userError}
                teamError={teamError}
                loading={userLoading || teamLoading}
            >
                {children}
            </CruxWrapper>
        </CruxContext.Provider>
    );
};

export const Crux = CruxInner;
