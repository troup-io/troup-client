import React, { useMemo } from 'react';
import { useRouter } from 'next/router';

import { GET_USER_DETAILS, GET_TEAM_BY_NAME } from '@queries';

import { CruxContext, CruxContextType } from '@services/CruxContext';

import { useQuery } from '@hooks/useQuery';

import { getTokenFromCookie, embedToken } from '@utils';
import { CruxWrapper } from './CruxWrapper';

export const Crux: React.FC<{ token?: string }> = ({ children, token }) => {
    const hasToken = !!getTokenFromCookie();
    const {
        query: { team: name },
    } = useRouter();
    const { data: user, error: userError, loading: userLoading } = useQuery(GET_USER_DETAILS, {
        skip: !hasToken,
        ...embedToken(token),
    });
    const { data: team, error: teamError, loading: teamLoading } = useQuery(GET_TEAM_BY_NAME, {
        variables: {
            name,
        },
        skip: !name || !hasToken,
        ...embedToken(token),
    });

    const cruxData = useMemo<CruxContextType>(
        () => ({
            user,
            team,
            token,
        }),
        [user, team, token]
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
