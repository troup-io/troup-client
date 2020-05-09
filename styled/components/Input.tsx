import { InputHTMLAttributes } from 'react';
import styled from 'styled-components';

import { color, variable, padding, margin } from '../helper';

type InputProps = InputHTMLAttributes<{}> & {
    label?: string;
    ref?: any;
};

export const Input = styled.input<InputProps>`
    width: 100%;
    ${padding(1.75)}
    ${margin(1)}
    color: ${color('dark')};
    font-family: inherit;
    font-size: 1rem;
    background: ${color('light')};
    border: 1px solid ${color('dim')};
    border-radius: ${variable('borderRadius')}px;
    outline: 0;
    transition: all .25s ease;
    cursor: pointer;

    &:hover, &:focus {
        border: 1px solid ${color('primaryDark')};
    }
`;
