import { useMemo } from 'react';
import {
    useMutation as _useMutation,
    OperationVariables,
    MutationHookOptions,
    MutationTuple,
    ApolloError,
} from '@apollo/client';
import { DocumentNode } from 'graphql';

import { popSingular, errorParser } from 'utils';

export function useMutation<TData = any, TVariables = OperationVariables>(
    query: DocumentNode,
    options?: MutationHookOptions<TData, TVariables>
): MutationTuple<TData, TVariables> {
    const [mutationHandler, { data, error, ...rest }] = _useMutation(query, options);
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
