import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import { AppRoutes } from 'routing/Routes';

import { Apollo } from 'services/Apollo';

import { GlobalStyles } from 'styled';
import { theme } from 'styled/theme';
import { Crux } from 'services/Crux';

export default function App(): JSX.Element {
    return (
        <BrowserRouter>
            <Apollo>
                <ThemeProvider theme={theme}>
                    <GlobalStyles />
                    <Crux>
                        <AppRoutes />
                    </Crux>
                </ThemeProvider>
            </Apollo>
        </BrowserRouter>
    );
}
