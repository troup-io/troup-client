import React from 'react';
import { useMutation, gql } from '@apollo/client';
import Head from 'next/head';
import { useForm } from 'react-hook-form';
import { Flex, Text, Heading } from '@primer/components';

import { AuthToken } from '@services/Auth';

import { withRedirectUser } from '@with/redirectUser';
import { withApollo } from '@with/apollo';

import { ButtonPrimary } from '@atoms/Button';
import { Input } from '@atoms/Input';
import { Link } from '@atoms/Link';

import { Loading } from '@molecules/Loading';

type FormData = {
    email: string;
    password: string;
};

const LOGIN_MUTATION = gql`
    mutation LOGIN_MUTATION($email: String!, $password: String!) {
        signinUser(email: $email, password: $password) {
            user {
                id
                ownerTeams {
                    id
                    name
                }
                memberTeams {
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
    const [loginUser, { loading, error }] = useMutation(LOGIN_MUTATION, {
        errorPolicy: 'none',
    });

    const submit = handleSubmit(async (data) => {
        const result = (await loginUser({
            variables: data,
        })) as any;
        await AuthToken.storeToken(result?.data?.token);
    });

    return (
        <Flex
            maxWidth={350}
            height="100%"
            m="auto"
            p="0 20px"
            flexDirection="column"
            justifyContent="center"
        >
            <Head>
                <title>Login - Troup</title>
                <meta name="title" content="Troiup / Login" />
                <meta name="description" content="Description to go with OG:Title" />
            </Head>
            {loading && <Loading />}
            <Heading fontSize={5} mb={4}>
                Login
            </Heading>
            <form style={{ width: '100%' }} onSubmit={!loading ? submit : undefined}>
                <Input
                    mb={3}
                    label="Email"
                    type="email"
                    name="email"
                    defaultValue="samrith_47@me.com"
                    ref={register({ required: true })}
                    autoFocus
                />
                <Input
                    mb={3}
                    label="Password"
                    type="password"
                    name="password"
                    defaultValue="helloworld"
                    ref={register({ required: true })}
                />
                <ButtonPrimary type="submit" disabled={loading} fullWidth mb={4}>
                    {loading ? 'Loading..' : 'Submit'}
                </ButtonPrimary>
                <Text>
                    Not a user? <Link href={`/signup`}>Register now!</Link>
                </Text>
                {error && error?.message}
            </form>
        </Flex>
    );
};

export default withRedirectUser(withApollo({ ssr: false })(Login));
