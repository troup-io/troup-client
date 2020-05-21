import React from 'react';
import { gql } from '@apollo/client';
import { useForm } from 'react-hook-form';

import { SigninUser } from '@server-types/SigninUser';

import { AuthToken } from '@services/Auth';

import { useMutation } from '@hooks/useMutation';

import { ButtonPrimary } from '@atoms/Button';
import { Input } from '@atoms/Input';

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

export const LoginUser: React.FC<{}> = () => {
    const { handleSubmit, register } = useForm<FormData>();
    const [loginUser, { loading, error }] = useMutation<SigninUser>(LOGIN_USER, {
        errorPolicy: 'none',
    });

    const submit = handleSubmit(async (data) => {
        const result = await loginUser({
            variables: data,
        });
        await AuthToken.storeToken(result?.data?.signinUser.token);
    });

    return (
        <form style={{ width: '100%' }} onSubmit={!loading ? submit : undefined}>
            <Input
                mb={3}
                label="Email"
                type="email"
                name="email"
                defaultValue="samrith_47@me.com"
                ref={register({ required: true })}
                tabIndex={0}
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
            {error && error?.message}
        </form>
    );
};
