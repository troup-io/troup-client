import { useMemo } from 'react';
import {
    useMutation as _useMutation,
    OperationVariables,
    MutationHookOptions,
    MutationTuple,
    ApolloError,
} from '@apollo/client';
import { DocumentNode } from 'graphql';

import { useHeaders } from './useHeaders';

import { popSingular, errorParser } from 'utils';

interface MutationOptions<TData, TVariables> extends MutationHookOptions<TData, TVariables> {
    headers?: {
        [key: string]: string | undefined;
    };
}

export function useMutation<TData = any, TVariables = OperationVariables>(
    query: DocumentNode,
    options?: MutationOptions<TData, TVariables>
): MutationTuple<TData, TVariables> {
    const headers = useHeaders(options?.headers);
    const [mutationHandler, { data, error, ...rest }] = _useMutation(query, {
        ...options,
        context: {
            ...options?.context,
            ...headers,
        },
    });
    const newData: TData | undefined | null = useMemo(() => popSingular(data), [data]);
    const newError: ApolloError | undefined | null = useMemo(
        () => errorParser(popSingular(error)),
        [error]
    );

    return [
        mutationHandler,
        {
            data: newData,
            error: newError,
            ...rest,
        },
    ];
}
