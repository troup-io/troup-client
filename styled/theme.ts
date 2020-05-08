const white = '#FFF';
const black = '#111';

const colors = {
    white,
    black,
    primaryLight: '#38F9D7',
    primaryDark: '#4FACFE',
    secondary: '#45415E',

    // light schemes
    light: '#FFFFF4',

    // dark schemes
    darker: '#323339',
    dark: '#4F4F4F',
    darkDim: '#828282',
    darkDimmer: '#BDBDBD',

    // Dim schemes
    dim: '#E0E0E0',
    dimmer: '#F2F2F2',

    // Status schemes
    success: '#5EC16E',
    info: '#73BDFF',
    warning: '#FFD861',
    panic: '#FFAC62',
    danger: '#EC6363',
};

const variables = {
    margin: 10,
    padding: 10,
    borderRadius: 10,
    fontSize: 14,
    fontBody: 'sans-serif',
    fontHeader: 'serif',
    fontBase: 14,
};

export type ColorsType = keyof typeof colors;
export type VariablesType = keyof typeof variables;

export interface Theme {
    colors: Record<ColorsType, string>;
    variables: Record<VariablesType, string | number>;
}

export const theme: Theme = {
    colors,
    variables,
};
