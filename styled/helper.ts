import { css } from 'styled-components';
import {
    padding as _padding,
    margin as _margin,
    darken as _darken,
    lighten as _lighten,
    transparentize as _transparentize,
    opacify as _opacify,
    rgba as _rgba,
} from 'polished';

import { Theme, ColorsType, VariablesType } from './theme';

interface Props {
    theme: Theme;
}

export const color = (key: ColorsType): any => (props: Props): string => props.theme.brand[key];

export const variable = (key: VariablesType): any => (props: Props): string | number =>
    props.theme.variables[key];

export const borderRadius = (
    topLeft = 1,
    topRight = undefined,
    bottomRight = undefined,
    bottomLeft = undefined
) => ({
    theme: {
        variables: { borderRadius },
    },
}: Props): any => css`
    border-radius: ${borderRadius * topLeft}px ${borderRadius * (topRight ?? topLeft)}px
        ${borderRadius * (bottomRight ?? topLeft)}px
        ${borderRadius * (bottomLeft ?? topRight ?? topLeft)}px;
`;

export const border = (
    size = 1,
    color?: ColorsType,
    side?: 'top' | 'left' | 'bottom' | 'right'
) => ({ theme: { brand, variables } }: Props): any => css`
    ${side ? `border-${side}` : 'border'}: ${variables.borderSize * size}px solid ${
    brand[color ?? 'dim']
};
`;

export const padding = (top = 1, right = undefined, bottom = undefined, left = undefined) => ({
    theme: {
        variables: { padding },
    },
}: Props): any =>
    _padding(
        padding * top,
        padding * (right ?? top),
        padding * (bottom ?? top),
        padding * (left ?? right ?? top)
    );

export const margin = (top = 0, right = undefined, bottom = undefined, left = undefined) => ({
    theme: {
        variables: { margin },
    },
}: Props): any =>
    _margin(
        margin * top,
        margin * (right ?? top),
        margin * (bottom ?? top),
        margin * (left ?? right ?? top)
    );

export const darken = (key: ColorsType, value: number) => (props: Props): any =>
    _darken(value, props.theme.brand[key]);

export const lighten = (key: ColorsType, value: number) => (props: Props): any =>
    _lighten(value, props.theme.brand[key]);

export const transparentize = (key: ColorsType, value: number) => (props: Props): any =>
    _transparentize(value, props.theme.brand[key]);

export const opacify = (key: ColorsType, value: number) => (props: Props): any =>
    _opacify(value, props.theme.brand[key]);

export const rgba = (key: ColorsType, value: number) => (props: Props): any =>
    _rgba(props.theme.brand[key], value);

export const boxShadow = (value?: number, color?: ColorsType) => (props: Props): any => css`
    box-shadow: 0 2px 5px 1px ${rgba(color ?? 'defaultBorder', value ?? 0.2)};
`;
