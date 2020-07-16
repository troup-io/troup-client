import React from 'react';
import styled from 'styled-components';
import { Flex } from '@primer/components';

import { Spinner } from '@atoms/Spinner';

import { rgba } from '@styled/helper';

export interface LoadingProps {
    opacify?: boolean;
    size?: number;
    fixed?: boolean;
}

const LoadingWrapper = styled(Flex)<LoadingProps>`
    position: ${(props) => (props.fixed ? 'fixed' : 'absolute')};
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${(props) => rgba('light', props.opacify ? 1 : 0.75)};
    z-index: 999;
`;

export const Loading: React.FC<LoadingProps> = ({ size, ...rest }) => {
    return (
        <LoadingWrapper alignItems="center" justifyContent="center" {...rest}>
            <Spinner size={size} />
        </LoadingWrapper>
    );
};

Loading.defaultProps = {
    opacify: false,
    size: 75,
    fixed: false,
};
