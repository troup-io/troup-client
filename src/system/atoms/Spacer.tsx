import React from 'react';
import styled from 'styled-components';
import { Box } from '@primer/components';

interface SpacerProps {
    gap?: number;
    row?: boolean;
}

export const Spacer = styled(Box)<SpacerProps>`
    display: grid;
    grid-template-${(props) => (!props.row ? 'rows' : 'columns')}: ${(props): string =>
    React.Children.map(props.children || [], () => 'max-content').join(' ')};
    ${(props) => (!props.row ? 'row' : 'column')}-gap: ${(props): number => props.gap ?? 0}px;
`;

Spacer.defaultProps = {
    gap: 10,
    row: false,
};
