import { rgba, desaturate } from 'polished';

// Base schemes
const white = '#FFF';
const black = '#111';

// Brand schemes
const primaryLight = '#38F9D7';
const primaryDark = '#4FACFE';
const secondary = '#45415E';

// Light schemes
const light = '#FFFFF4';

// Dark schemes
const darker = '#323339';
const dark = '#4F4F4F';
const darkDim = '#828282';
const darkDimmer = '#BDBDBD';

// Dim schemes
const dim = '#E0E0E0';
const dimmer = '#F2F2F2';

// Grey schemes
const grayAlt = '#FAFBFC';

// Status schemes
const success = '#5EC16E';
const info = '#73BDFF';
const warning = '#FFD861';
const panic = '#FFAC62';
const danger = '#EC6363';

// Default schemes
const defaultText = darkDim;
const defaultBg = 'transparent';
const defaultBorder = darkDim;
const disabledText = darkDimmer;
const disabledBg = dim;

export const defaultColors = {
    white,
    black,
    primaryLight,
    primaryDark,
    secondary,
    light,
    darker,
    dark,
    darkDim,
    darkDimmer,
    dim,
    dimmer,
    grayAlt,
    success,
    info,
    warning,
    panic,
    danger,
    defaultText,
    defaultBg,
    defaultBorder,
    disabledText,
    disabledBg,
};

export type ColorsType = keyof typeof defaultColors;

export default {
    bodytext: darker,
    black,
    white,
    gray: dark,
    blue: primaryDark,
    green: success,
    orange: panic,
    purple: secondary,
    red: danger,
    yellow: warning,
    pink: 'pink',
    blackfade15: rgba(black, 0.15), // `rgba(27, 31, 35, 0.15)`,
    blackfade20: rgba(black, 0.2), // 'rgba(27, 31, 35, 0.20)',
    blackfade30: rgba(black, 0.3), // 'rgba(27,31,35,0.3)',
    blackfade35: rgba(black, 0.35), // 'rgba(27, 31, 35, 0.35)',
    blackfade50: rgba(black, 0.5), // 'rgba(27, 31, 35, 0.5)',
    whitefade15: rgba(light, 0.15), // 'rgba(255, 255, 255, 0.15)',
    whitefade50: rgba(light, 0.5), // 'rgba(255, 255, 255, 0.50)',
    state: {
        error: danger,
        failure: danger,
        pending: warning,
        queued: warning,
        success,
        unknown: dark,
    },

    border: {
        blackFade: rgba(black, 0.15),
        blue: primaryDark,
        blueLight: primaryLight,
        grayLight: dim,
        gray: darkDimmer,
        grayDark: dark,
        grayDarker: darker,
        green: success,
        greenLight: desaturate(0.4, success),
        purple: secondary,
        red: danger,
        redLight: desaturate(0.6, danger),
        white: light,
        whiteFade: rgba(light, 0.15),
        yellow: desaturate(0.6, warning),
    },
    counter: {
        bg: rgba(black, 0.08),
    },
    filterList: {
        hoverBg: dimmer,
    },
    text: {
        gray: darkDim,
        grayLight: darkDimmer,
        grayDark: dark,
        red: danger,
    },
    bg: {
        gray: darkDim,
        grayLight: dimmer,
        disabled: dim,
    },
    accent: panic,
    labels: {
        gray: dimmer,
        grayText: darkDim,
        grayDark: dark,
        grayDarkText: light,
        blue: info,
        blueText: light,
        orange: warning,
        orangeText: light,
        green: success,
        greenText: light,
        red: danger,
        redText: light,
        yellow: warning,
        yellowText: darker,
        pink: 'pink',
        pinkText: darker,
        purple: secondary,
        purpleText: light,
    },
};
