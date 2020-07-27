import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';

import { GET_USER_DETAILS, GET_TEAM_BY_NAME } from 'data/queries';

import { CruxContext, CruxContextType } from 'services/CruxContext';

import { useAuth } from 'hooks/useAuth';
import { useQuery } from 'hooks/useQuery';

import { CruxWrapper } from './CruxWrapper';

import { extractTeamNameFromURL } from 'utils';

// import { embedToken } from 'utils';

export const Crux: React.FC = ({ children }) => {
    const { authenticated, token } = useAuth();
    const loc = useLocation();
    const name = extractTeamNameFromURL(loc);
    const { data: user, error: userError, loading: userLoading } = useQuery(GET_USER_DETAILS, {
        skip: !authenticated,
        // ...embedToken(token || ''),
    });
    const { data: team, error: teamError, loading: teamLoading } = useQuery(GET_TEAM_BY_NAME, {
        variables: {
            name,
        },
        skip: !name || !authenticated,
        // ...embedToken(token || ''),
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
