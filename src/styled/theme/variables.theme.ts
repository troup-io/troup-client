import { math } from 'polished';

export const sizes = {
    small: '544px',
    medium: '768px',
    large: '1012px',
    xlarge: '1280px',
};

const variables = {
    margin: 10,
    padding: 10,
    borderRadius: 7,
    borderSize: 1,
    breakPoints: {
        xs: `@media (max-width: ${manip(sizes.small)})`,
        sm: `@media (min-width: ${sizes.small}) and (max-width: ${manip(sizes.medium)})`,
        md: `@media (min-width: ${sizes.medium}) and (max-width: ${manip(sizes.large)})`,
        lg: `@media (min-width: ${sizes.large}) and (max-width: ${manip(sizes.xlarge)})`,
        xl: `@media (min-width: ${sizes.xlarge})`,
    },
};

export default variables;
export type VariablesType = keyof typeof variables;

export const breakpoints = [sizes.small, sizes.medium, sizes.large, sizes.xlarge];

export const borderWidths = [0, '1px'];

export const radii = new Array(4).fill(`${variables.borderRadius}px`);

export const fonts = {
    normal: fontStack([
        '-apple-system',
        'BlinkMacSystemFont',
        'Segoe UI',
        'Helvetica',
        'Arial',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
    ]),
    mono: fontStack([
        'SFMono-Regular',
        'Consolas',
        'Liberation Mono',
        'Menlo',
        'Courier',
        'monospace',
    ]),
};

export const fontWeights = {
    light: 300,
    normal: 400,
    semibold: 500,
    bold: 600,
};

export const fontSizes = ['12px', '14px', '16px', '20px', '24px', '32px', '40px', '48px'];

export const space = [
    '0',
    '4px',
    '8px',
    '16px',
    '24px',
    '32px',
    '40px',
    '48px',
    '64px',
    '80px',
    '96px',
    '112px',
    '128px',
];

function fontStack(fonts): string[] {
    return fonts.map((font: string) => (font.includes(' ') ? `"${font}"` : font)).join(', ');
}

function manip(value: string, add = false): string {
    return math(`${value} ${add ? '+' : '-'} 1`);
}
