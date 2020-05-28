import { createContext } from 'react';

import { GetTeamByName_teamDetailsFromName } from '@server-types/GetTeamByName';
import { GetUserDetails_userDetails } from '@server-types/GetUserDetails';

export type CruxContextType = {
    user?: GetUserDetails_userDetails;
    team?: GetTeamByName_teamDetailsFromName;
};

export const CruxContext = createContext<CruxContextType>({
    user: null,
    team: null,
});
