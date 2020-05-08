import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { useForm } from 'react-hook-form';

import { AuthToken } from '../services/Auth';

import { withRedirectUser, withApollo } from '../with';

type FormData = {
    email: string;
    password: string;
};

const LOGIN_MUTATION = gql`
    mutation LOGIN_MUTATION($email: String!, $password: String!) {
        signinUser(email: $email, password: $password) {
            user {
                id
                teams {
                    id
                    name
                }
            }
            token
        }
    }
`;

const Login: React.FC<{ auth: any }> = () => {
    const { handleSubmit, register } = useForm<FormData>();
    const [loginUser, opts] = useMutation(LOGIN_MUTATION, {
        errorPolicy: 'none',
    });
    const { loading, error, data } = opts;

    const submit = handleSubmit(async (data) => {
        const result = (await loginUser({
            variables: data,
        })) as any;
        await AuthToken.storeToken(result?.data?.token);
    });

    return (
        <>
            <form onSubmit={!loading ? submit : undefined}>
                <p>
                    <input
                        type="email"
                        name="email"
                        defaultValue="samrith_47@me.com"
                        ref={register({ required: true })}
                    />
                </p>
                <p>
                    <input
                        type="password"
                        name="password"
                        defaultValue="helloworld"
                        ref={register({ required: true })}
                    />
                </p>
                <button type="submit" disabled={loading}>
                    {loading ? 'Loading..' : 'Submit'}
                </button>
            </form>
            {data && (
                <pre
                    style={{
                        padding: 10,
                        background: '#111',
                        color: 'lime',
                        overflowY: 'auto',
                        borderRadius: 10,
                    }}
                >
                    {JSON.stringify(data, null, 2)}
                </pre>
            )}
            {error && error?.message}
        </>
    );
};

export default withRedirectUser(withApollo({ ssr: true })(Login));
