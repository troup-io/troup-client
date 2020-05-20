import React from 'react';
import styled from 'styled-components';
import { Flex } from '@primer/components';

import { Spinner } from '@atoms/Spinner';

import { rgba } from '@styled/helper';

export interface LoadingProps {
    opacify?: boolean;
    size?: number;
}

const LoadingWrapper = styled(Flex)<LoadingProps>`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: ${(props) => rgba('light', props.opacify ? 1 : 0.75)};
    z-index: 999;
`;

export const Loading: React.FC<LoadingProps> = ({ opacify, size = 75 }) => {
    return (
        <LoadingWrapper alignItems="center" justifyContent="center">
            <Spinner size={size} />
        </LoadingWrapper>
    );
};
