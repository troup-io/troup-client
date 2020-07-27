import React from 'react';
import styled from 'styled-components';
import { Box } from '@primer/components';

interface SpacerProps {
    gap?: number;
    flow?: 'row' | 'column';
}

export const Spacer = styled(Box)<SpacerProps>`
    display: grid;
    grid-template-rows: ${(props): string =>
        React.Children.map(props.children || [], () => 'max-content').join(' ')};
    row-gap: ${(props): number => props.gap ?? 0}px;
`;

Spacer.defaultProps = {
    gap: 10,
    flow: 'row',
};
