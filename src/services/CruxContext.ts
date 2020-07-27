import { createContext } from 'react';

import { GetTeamByName_teamDetailsFromName } from 'server-types/GetTeamByName';
import { GetUserDetails_userDetails } from 'server-types/GetUserDetails';

export type CruxContextType = {
    user: GetUserDetails_userDetails | null;
    team: GetTeamByName_teamDetailsFromName | null;
    token: string | null | undefined;
};

export const CruxContext = createContext<CruxContextType>({
    user: null,
    team: null,
    token: null,
});
