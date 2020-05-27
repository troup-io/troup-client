import styled, { css } from 'styled-components';
import { TextInput, TextInputProps } from '@primer/components';

import { color, rgba, padding, borderRadius, boxShadow } from '@styled/helper';

type InputProps = TextInputProps & {
    isVerified?: boolean;
    isErrored?: boolean;
    label?: string;
};

const verifiedStyled = (status: 'success' | 'danger'): any => css`
    border-color: ${rgba(status, 0.4)};

    &:hover,
    &:focus-within {
        border-color: ${rgba(status, 0.6)};
    }
`;

export const Input = styled(TextInput)<InputProps>`
    position: relative;
    display: block;
    width: 100%;
    height: ${(props): any => (props.label ? '54px' : '49px')};
    ${(props): any => (props.label ? padding(2.25, 1.25, 0.75) : padding(1.25))};
    color: ${color('defaultText')};
    background: ${color('light')};
    border: 2px solid ${rgba('defaultBorder', 0.1)};
    ${borderRadius(1)};
    box-shadow: none;
    transition: all 0.25s ease;

    &:hover,
    &:focus,
    &:active,
    &:focus-within {
        box-shadow: none;
    }

    &:before {
        content: '${(props): any => props.label}';
        display: ${(props): any => (props.label ? 'block' : 'none')};
        position: absolute;
        top: 12px;
        left: 1px;
        ${padding(0, 0, 0, 1.25)};
        font-size: 0.65em;
        font-weight: 900;
        line-height: 1;
        text-transform: uppercase;
        opacity: 0.5;
        user-select: none;
    }

    > input::placeholder {
        color: ${color('darkDimmer')};
    }

    &:hover {
        border-color: ${rgba('defaultBorder', 0.2)};
        ${boxShadow()};
    }

    &:focus-within {
        border-color: ${rgba('primaryDark', 0.5)};
        ${boxShadow(0.3, 'primaryDark')};
    }

    ${(props): any => props.isVerified && verifiedStyled('success')}
    ${(props): any => props.isErrored && verifiedStyled('danger')}
`;
