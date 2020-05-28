import { createContext } from 'react';

import { GetTeamByName_teamDetailsFromName } from '@server-types/GetTeamByName';

export type CruxContextType = {
    user?: any;
    team?: Omit<GetTeamByName_teamDetailsFromName, '__typename'>;
};

export const CruxContext = createContext<CruxContextType>({
    user: null,
    team: null,
});
