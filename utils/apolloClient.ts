import { ApolloClient, HttpLink } from '@apollo/client';
import { InMemoryCache, NormalizedCacheObject } from '@apollo/client/cache';
import fetch from 'isomorphic-unfetch';

export default function createApolloClient(initialState, ctx): ApolloClient<NormalizedCacheObject> {
    // The `ctx` (NextPageContext) will only be present on the server.
    // use it to extract auth headers (ctx.req) or similar.
    return new ApolloClient({
        ssrMode: Boolean(ctx),
        link: new HttpLink({
            uri: 'http://localhost:4000/graphql', // Server URL (must be absolute)
            // credentials: 'include', // Additional fetch() options like `credentials` or `headers`
            fetch,
        }),
        cache: new InMemoryCache().restore(initialState),
        defaultOptions: {
            watchQuery: {
                errorPolicy: 'ignore',
            },
            query: {
                errorPolicy: 'all',
            },
            mutate: {
                errorPolicy: 'all',
            },
        },
    });
}
