import React from 'react';
import { gql } from '@apollo/client';
import { useForm } from 'react-hook-form';

import { SigninUser } from '@server-types/SigninUser';

import { AuthToken } from '@services/Auth';

import { useMutation } from '@hooks/useMutation';

import { ButtonPrimary } from '@atoms/Button';
import { Input } from '@atoms/Input';
import { AlertDanger } from '@atoms/Alert';

import { AuthWrapper } from '@components/AuthWrapper';

import { withRedirectUser } from '@with/redirectUser';

const LOGIN_USER = gql`
    mutation SigninUser($email: String!, $password: String!) {
        signinUser(email: $email, password: $password) {
            user {
                id
            }
            token
        }
    }
`;

const Login: React.FC<{}> = () => {
    const { handleSubmit, register } = useForm<FormData>();
    const [loginUser, { loading, error }] = useMutation<SigninUser>(LOGIN_USER, {
        errorPolicy: 'none',
    });

    const submit = handleSubmit(async (data) => {
        if (!loading) {
            const result = await loginUser({
                variables: data,
            });
            await AuthToken.storeToken(result?.data?.signinUser.token);
        }
    });

    return (
        <AuthWrapper pageHeading="Login">
            <form style={{ width: '100%' }} onSubmit={!loading ? submit : undefined}>
                {error && <AlertDanger mb={3}>{error.message}</AlertDanger>}
                <Input
                    mb={3}
                    label="Email"
                    type="email"
                    name="email"
                    defaultValue="john@troup.io"
                    ref={register({ required: true })}
                    tabIndex={0}
                />
                <Input
                    mb={3}
                    label="Password"
                    type="password"
                    name="password"
                    defaultValue="test"
                    ref={register({ required: true })}
                />
                <ButtonPrimary type="submit" disabled={loading} fullWidth mb={4}>
                    {loading ? 'Loading..' : 'Submit'}
                </ButtonPrimary>
            </form>
        </AuthWrapper>
    );
};

export default withRedirectUser(Login);
