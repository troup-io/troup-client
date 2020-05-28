import { useContext } from 'react';

import { CruxContextType, CruxContext } from '@services/CruxContext';

export function useCrux(): CruxContextType {
    return useContext(CruxContext);
}
