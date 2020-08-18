import styled, { css } from 'styled-components';
import { Button as _Button, ButtonProps as PrimerButtonprops } from '@primer/components';

import { VariantsType } from 'styled/interfaces';
import { color, darken, transition } from 'styled/helper';
import { getVariantStyle } from 'styled/util';

export type ButtonProps = PrimerButtonprops & {
    fullWidth?: boolean;
};

const commons = css<ButtonProps>`
    ${(props) => props.fullWidth && 'width: 100%'};
    font-weight: 500;
    border: 0;
    box-shadow: none;
    transition: all 0.25s ease;

    &:hover,
    &:focus,
    &:active {
        box-shadow: none;
    }

    &[disabled] {
        &,
        &:focus,
        &:hover,
        &:active {
            color: ${color('disabledText')};
            background: ${color('disabledBg')};
            cursor: not-allowed;
        }
    }
`;

const variantStyle = (variant: VariantsType): any => {
    const { mainColor, altColor } = getVariantStyle(variant);

    return css<ButtonProps>`
        border: 1px solid transparent;
        color: ${color(altColor)};
        background: ${color(mainColor)};
        ${transition(['color', 'background'])};

        &:hover {
            background: ${darken(mainColor, 0.1)};
        }

        &:focus {
            background: ${darken(mainColor, 0.15)};
        }

        &:active {
            background: ${darken(mainColor, 0.2)};
        }

        ${commons};
    `;
};

export const Button = styled(_Button)<ButtonProps>`
    ${variantStyle('default')};
`;

export const ButtonPrimary = styled(_Button)<ButtonProps>`
    ${variantStyle('primary')};
`;

export const ButtonSuccess = styled(_Button)<ButtonProps>`
    ${variantStyle('success')};
`;

export const ButtonInfo = styled(_Button)<ButtonProps>`
    ${variantStyle('info')};
`;

export const ButtonWarning = styled(_Button)<ButtonProps>`
    ${variantStyle('warning')};
`;

export const ButtonPanic = styled(_Button)<ButtonProps>`
    ${variantStyle('panic')};
`;

export const ButtonDanger = styled(_Button)<ButtonProps>`
    ${variantStyle('danger')};
`;
