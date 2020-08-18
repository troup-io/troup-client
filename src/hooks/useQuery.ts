import { useMemo } from 'react';
import {
    useQuery as _useQuery,
    OperationVariables,
    QueryHookOptions,
    QueryResult,
} from '@apollo/client';
import { DocumentNode } from 'graphql';

import { useHeaders } from './useHeaders';

import { popSingular, errorParser } from 'utils';

interface QueryOptions<TData, TVariables> extends QueryHookOptions<TData, TVariables> {
    headers?: {
        [key: string]: string | undefined;
    };
}

export function useQuery<TData = any, TVariables = OperationVariables>(
    query: DocumentNode,
    options?: QueryOptions<TData, TVariables>
): QueryResult<TData, TVariables> {
    const headers = useHeaders(options?.headers);
    const { data, error, ...rest } = _useQuery(query, {
        ...options,
        context: {
            ...options?.context,
            ...headers,
        },
        errorPolicy: 'all',
    });
    const newData: TData | undefined | null = useMemo(() => popSingular(data), [data]);
    const newError = useMemo(() => errorParser(popSingular(error)), [error]);

    return {
        data: newData,
        error: newError,
        ...rest,
    };
}
