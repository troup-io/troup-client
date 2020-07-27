import React from 'react';
import styled, { keyframes } from 'styled-components';

import LogoInnerIconOnly from 'images/troup-icon-only.svg';

interface SpinnerProps {
    size?: number;
}

const grow = keyframes`
    0% {
        transform: translate3d(0, 0, 0);
    }
    50% {
        transform: translate3d(0, -10px, 0);
    }
`;
const SpinnerStyle = styled.div<{ width: number; height: number }>`
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    animation: ${grow} 2s linear infinite;
    user-select: none;
`;

export const Spinner: React.FC<SpinnerProps> = ({ size = 106 }: SpinnerProps) => {
    const height = size / (Math.floor((106 / 48) * 100) / 100);
    return (
        <SpinnerStyle width={size} height={height}>
            <img src={LogoInnerIconOnly} alt="troup-loading-icon" width="100%" height="100%" />
        </SpinnerStyle>
    );
};
