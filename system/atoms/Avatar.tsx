import styled from 'styled-components';
import { Avatar as _Avatar } from '@primer/components';
import { borderRadius, color } from '@styled/helper';

export const Avatar = styled(_Avatar)`
    ${borderRadius(1)};
    background: ${color('dimmer')};
    transition: all 0.25s ease;
`;
