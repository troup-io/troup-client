import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

import { color, darken } from './helper';

export const GlobalStyles = createGlobalStyle`
    ${normalize}

    html, body {
        width: 100%;
        height: 100%;
        color: ${color('light')};
        font-family: 'Alegreya Sans', sans-serif;
        font-weight: 300;
        background: ${color('base')};
    }

    #root {
        width: 100%;
        height: 100%;
    }

    * {
        box-sizing: border-box;
    }

    a {
        text-decoration: none;

        &:link, &:visited {
            color: ${color('primaryDark')};
        }

        &:hover, &:focus {
            outline: 0;
            color: ${darken('primaryDark', 0.2)};
        }

        &:active {
            color: ${darken('primaryDark', 0.3)};
        }
    }

    h1, h2, h3, h4, h5, h6 {
        font-family: "DM Sans", sans-serif;
        font-weight: 500;
    }

    b, strong {
        font-weight: 700;
    }

    .slate-BalloonToolbar {
        position: fixed;
        z-index: -1;

        &[style] {
            z-index: 9999;
        }
    }
`;
