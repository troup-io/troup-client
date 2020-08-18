import React, { useMemo } from 'react';
import { ApolloClient, InMemoryCache, HttpLink, ApolloProvider } from '@apollo/client';

let apolloClient: ApolloClient<any>;

function createApolloClient(): ApolloClient<any> {
    return new ApolloClient({
        ssrMode: typeof window === 'undefined',
        connectToDevTools: true,
        link: new HttpLink({
            uri: process.env.REACT_APP_ENDPOINT, // Server URL (must be absolute)
            // credentials: 'include', // Additional fetch() options like `credentials` or `headers`
            fetch,
        }),
        cache: new InMemoryCache(),
    });
}

export function initializeApollo(initialState = null): ApolloClient<any> {
    const _apolloClient = createApolloClient();

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

export function useApollo(initialState?: any): ApolloClient<any> {
    const store = useMemo(() => initializeApollo(initialState), [initialState]);
    return store;
}

export const Apollo: React.FC = ({ children }) => {
    const client = useApollo();
    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
