import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { withApollo } from '../lib/apollo';

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

const Login: React.FC<{}> = () => {
    const { handleSubmit, register } = useForm<FormData>();
    const [loginUser, opts] = useMutation(LOGIN_MUTATION, {
        errorPolicy: 'none',
    });
    const { loading, error, data } = opts;

    const submit = handleSubmit(async (data) => {
        await loginUser({
            variables: data,
        });
    });

    return (
        <>
            <form onSubmit={!loading ? submit : undefined}>
                <p>
                    <input
                        type="email"
                        name="email"
                        defaultValue="samrithxs@me.com"
                        ref={register({ required: true })}
                    />
                </p>
                <p>
                    <input
                        type="password"
                        name="password"
                        defaultValue="hello-world"
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

export default withApollo()(Login);
