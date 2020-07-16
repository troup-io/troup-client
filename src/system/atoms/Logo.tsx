import React from 'react';
import styled from 'styled-components';

import LogoOriginal from '@images/logo-original.svg';

export interface LogoProps {
    size?: number;
}

const LogoStyle = styled.div<{ width: number; height: number }>`
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    user-select: none;
`;

export const Logo: React.FC<LogoProps> = ({ size = 125 }) => {
    const height = size / (Math.floor((637 / 228) * 100) / 100);
    return (
        <LogoStyle width={size} height={height}>
            <img src={LogoOriginal} alt="troup logo" width="100%" height="100%" />
        </LogoStyle>
    );
};
