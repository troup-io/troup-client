import React from 'react';
import styled from 'styled-components';
import { Box } from '@primer/components';

interface SpacerProps {
    gap?: number;
}

export const Spacer = styled(Box)<SpacerProps>`
    display: grid;
    width: max-content;
    height: max-content;
    grid-template-rows: ${(props): string =>
        React.Children.map(props.children, () => 'auto').join(' ')};
    row-gap: ${(props): number => props.gap}px;
`;

Spacer.defaultProps = {
    gap: 10,
};
