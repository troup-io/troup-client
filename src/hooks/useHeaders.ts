import { useAuth } from './useAuth';
import { useCrux } from './useCrux';

interface HeaderInnerType {
    context?: string;
    authorization?: string;
    [key: string]: string | undefined;
}

interface HeaderType {
    headers: HeaderInnerType;
}

export const useHeaders = (headers?: { [key: string]: string | undefined }): HeaderType => {
    const { token } = useAuth();
    const { team } = useCrux();

    const concatHeaders = Object.entries({
        ...headers,
        context: team ? `team ${team.id}` : '',
        authorization: token ? `Bearer ${token.replace(/"/g, '')}` : '',
    }).reduce(
        (acc, [key, value]) => ({
            ...acc,
            ...(value
                ? {
                      [key]: value,
                  }
                : {}),
        }),
        {}
    ) as HeaderInnerType;

    return {
        headers: {
            ...concatHeaders,
        },
    };
};
