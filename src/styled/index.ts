import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

import { color, darken } from './helper';

export const GlobalStyles = createGlobalStyle`
    ${normalize}

    html, body {
        width: 100%;
        height: 100%;
        color: ${color('light')};
        font-family: 'Lato', sans-serif;
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
    }
`;
