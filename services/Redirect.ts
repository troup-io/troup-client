import { ServerResponse } from 'http';
import Router from 'next/router';
import { formUrl } from '@utils';

export const redirectToLogin = (server?: ServerResponse, teamName?: string | string[]): void => {
    const login = formUrl('login', teamName, true);

    if (server) {
        server.writeHead(302, {
            Location: login,
        });
        server.end();
    } else {
        Router.push(login);
    }
};

export const redirectToDashboard = (
    server?: ServerResponse,
    teamName?: string | string[]
): void => {
    const dashboard = formUrl('dashboard', teamName, true);

    if (server) {
        server.writeHead(302, {
            Location: dashboard,
        });
        server.end();
    } else {
        Router.push(dashboard);
    }
};
