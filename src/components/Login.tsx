import React from 'react';
import { gql } from '@apollo/client';
import { useForm } from 'react-hook-form';

import { useAuth } from 'hooks/useAuth';
import { useMutation } from 'hooks/useMutation';

import { ButtonPrimary } from 'system/atoms/Button';
import { Input } from 'system/atoms/Input';
import { AlertDanger } from 'system/atoms/Alert';

import { AuthWrapper } from 'components/AuthWrapper';

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

export const Login: React.FC = () => {
    const { login } = useAuth();
    const { handleSubmit, register } = useForm<FormData>();
    const [loginUser, { loading, error }] = useMutation(LOGIN_USER, {
        errorPolicy: 'none',
    });

    const submit = handleSubmit(async (data) => {
        if (!loading) {
            const result = await loginUser({
                variables: data,
            });
            login(result?.data?.signinUser?.token || '');
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
