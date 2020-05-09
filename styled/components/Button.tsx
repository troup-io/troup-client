import { ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

import { color, variable, padding, darken } from '../helper';

type ButtonProps = ButtonHTMLAttributes<{}> & {
    inverse?: boolean;
};

export const Button = styled.button<ButtonProps>`
    ${padding(0.5, 2.5)}
    color: ${color('light')};
    background: ${color('primaryDark')};
    border: 1px solid transparent;
    border-radius: ${variable('borderRadius')}px;
    outline: 0;
    cursor: pointer;

    &:hover {
        background: ${darken('primaryDark', 0.15)};
        transition: all .25s ease;
    }

    ${(props): any =>
        props.inverse &&
        css<ButtonProps>`
            color: ${color('primaryDark')};
            background: transparent;
            border: 1px solid ${color('primaryDark')};

            &:hover {
                color: ${color('white')};
            }
        `}
`;
