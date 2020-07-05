import { useMemo } from 'react';
import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat } from '@apollo/client';

let apolloClient;

function createApolloClient(token?: string): ApolloClient<any> {
    console.log('token in cac', token);
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        link: concat(
            new ApolloLink((operation, forward) => {
                if (token) {
                    operation.setContext({
                        headers: {
                            authorization: `Bearer ${token.replace(/"/g, '')}`,
                        },
                    });
                }

                return forward(operation);
            }),
            new HttpLink({
                uri: process.env.NEXT_PUBLIC_ENDPOINT, // Server URL (must be absolute)
                // credentials: 'include', // Additional fetch() options like `credentials` or `headers`
                fetch,
            })
        ),
        cache: new InMemoryCache(),
    });
}

export function initializeApollo(initialState = null, token?: string): ApolloClient<any> {
    const _apolloClient = apolloClient ?? createApolloClient(token);

    // If your page has Next.js data fetching methods that use Apollo Client, the initial state
    // gets hydrated here
    if (initialState) {
        _apolloClient.cache.restore(initialState);
    }
    // For SSG and SSR always create a new Apollo Client
    if (typeof window === 'undefined') return _apolloClient;
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = _apolloClient;

    return _apolloClient;
}

export function useApollo(initialState?: any, token?: string): ApolloClient<any> {
    const store = useMemo(() => initializeApollo(initialState, token), [initialState]);
    return store;
}
