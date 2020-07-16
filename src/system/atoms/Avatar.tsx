import styled from 'styled-components';
import { Avatar as _Avatar } from '@primer/components';
import { borderRadius, color } from '@styled/helper';

export const Avatar = styled(_Avatar)`
    ${borderRadius(1)};
    background: ${color('dimmer')};
    transition: all 0.25s ease;
`;

interface AvatarTextProps {
    size?: number;
}

export const AvatarText = styled.div<AvatarTextProps>`
    display: flex;
    align-items: center;
    justify-content: center;
    width: ${(props): number => props.size}px;
    height: ${(props): number => props.size}px;
    color: ${color('white')};
    background: ${color('primaryDark')};
    ${borderRadius(1)};
`;
