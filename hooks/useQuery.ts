import { useMemo } from 'react';
import {
    useQuery as _useQuery,
    OperationVariables,
    QueryHookOptions,
    QueryResult,
} from '@apollo/client';
import { DocumentNode } from 'graphql';

import { useCrux } from '@hooks/useCrux';

import { popSingular, errorParser } from '@utils';

export function useQuery<TData = any, TVariables = OperationVariables>(
    query: DocumentNode,
    options?: QueryHookOptions<TData, TVariables>
): QueryResult<TData, TVariables> {
    const { team } = useCrux();
    const { data, error, ...rest } = _useQuery(query, {
        ...options,
        context: {
            ...options?.context,
            context: team ? `team ${team.id}` : '',
        },
        errorPolicy: 'all',
    });
    const newData: TData = useMemo(() => popSingular(data), [data]);
    const newError = useMemo(() => errorParser(popSingular(error)), [error]);

    return {
        data: newData,
        error: newError,
        ...rest,
    };
}
