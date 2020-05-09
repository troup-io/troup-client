import { createGlobalStyle } from 'styled-components';
import { normalize } from 'styled-normalize';

import { color } from './helper';

export const GlobalStyles = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=DM+Sans:400,700|Lato:400,900&display=swap');

    ${normalize}

    html, body {
        width: 100%;
        height: 100%;
        color: ${color('dark')};
        font-family: 'Lato', sans-serif;
        font-size: 14px;
        background: ${color('light')};
    }

    #__next {
        width: 100%;
        height: 100%;
    }

    * {
        box-sizing: border-box;
    }
`;
