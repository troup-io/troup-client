export function popSingular<T>(data: T): T {
    if (data) {
        const dataValues = Object.values(data);

        if (dataValues.length === 1) {
            return dataValues.pop() as T;
        }

        return data;
    }

    return data;
}

export function formUrl(
    path: 'login' | 'dashboard',
    teamName?: string | string[],
    redirected?: boolean
): string {
    let pathname = null;

    switch (path) {
        case 'login': {
            pathname = teamName ? `/${teamName}/login` : '/login';
            break;
        }

        case 'dashboard':
        default: {
            pathname = teamName ? `/${teamName}` : '/';
            break;
        }
    }

    return [pathname, redirected ? '?redirected=true' : ''].join('');
}
