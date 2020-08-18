import styled from 'styled-components';
import { Grid } from '@primer/components';

import { variable } from 'styled/helper';

export const Content = styled(Grid)`
    grid-auto-rows: max-content;
    grid-template-columns: ${variable('contentWidth')};
    justify-content: center;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
`;
