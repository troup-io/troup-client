import { ServerResponse } from 'http';
import Router from 'next/router';

export const redirectToLogin = (server?: ServerResponse): void => {
    const login = '/login?redirected=true';

    if (server) {
        server.writeHead(302, {
            Location: login,
        });
        server.end();
    } else {
        Router.push(login);
    }
};

export const redirectToDashboard = (server?: ServerResponse): void => {
    const dashboard = '/?redirected=true';

    if (server) {
        server.writeHead(302, {
            Location: dashboard,
        });
        server.end();
    } else {
        Router.push(dashboard);
    }
};
