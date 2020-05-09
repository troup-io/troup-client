import {
    padding as _padding,
    margin as _margin,
    darken as _darken,
    lighten as _lighten,
    transparentize as _transparentize,
    opacify as _opacify,
} from 'polished';

import { Theme, ColorsType, VariablesType } from './theme';

interface Props {
    theme: Theme;
}

export const color = (key: ColorsType): any => (props: Props): string => props.theme.colors[key];

export const variable = (key: VariablesType): any => (props: Props): string | number =>
    props.theme.variables[key];

export const padding = (top = 0, right = undefined, bottom = undefined, left = undefined) => (
    props: Props
): any =>
    _padding(
        (props.theme.variables.padding as number) * top,
        (props.theme.variables.padding as number) * (right ?? top),
        (props.theme.variables.padding as number) * (bottom ?? top),
        (props.theme.variables.padding as number) * (left ?? right ?? top)
    );

export const margin = (top = 0, right = 0, bottom = undefined, left = undefined) => (
    props: Props
): any =>
    _margin(
        (props.theme.variables.margin as number) * top,
        (props.theme.variables.margin as number) * right,
        (props.theme.variables.margin as number) * (bottom ?? top),
        (props.theme.variables.margin as number) * (left ?? left)
    );

export const darken = (key: ColorsType, value: number) => (props: Props): any =>
    _darken(value, props.theme.colors[key]);

export const lighten = (key: ColorsType, value: number) => (props: Props): any =>
    _lighten(value, props.theme.colors[key]);

export const transparentize = (key: ColorsType, value: number) => (props: Props): any =>
    _transparentize(value, props.theme.colors[key]);

export const opacity = (key: ColorsType, value: number) => (props: Props): any =>
    _opacify(value, props.theme.colors[key]);
