import { ApolloClient, HttpLink, ApolloLink, concat } from '@apollo/client';
import { InMemoryCache, NormalizedCacheObject } from '@apollo/client/cache';
import fetch from 'isomorphic-unfetch';
import { getTokenFromCookie } from '@utils';

export default function createApolloClient(initialState, ctx): ApolloClient<NormalizedCacheObject> {
    // The `ctx` (NextPageContext) will only be present on the server.
    // use it to extract auth headers (ctx.req) or similar.
    const token = getTokenFromCookie(ctx);

    return new ApolloClient({
        ssrMode: Boolean(ctx),
        link: concat(
            new ApolloLink((operation, forward) => {
                operation.setContext({
                    headers: {
                        authorization: token ? `Bearer ${token.replace(/"/g, '')}` : null,
                    },
                });

                return forward(operation);
            }),
            new HttpLink({
                uri: process.env.NEXT_PUBLIC_ENDPOINT, // Server URL (must be absolute)
                // credentials: 'include', // Additional fetch() options like `credentials` or `headers`
                fetch,
            })
        ),
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
        connectToDevTools: true,
    });
}
