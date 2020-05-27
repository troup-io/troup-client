import React from 'react';
import { gql } from '@apollo/client';
import { useForm } from 'react-hook-form';

import { GetTeamByName_teamDetailsFromName } from '@server-types/GetTeamByName';
import { SigninTeam } from '@server-types/SigninTeam';

import { AuthToken } from '@services/Auth';

import { useMutation } from '@hooks/useMutation';

import { ButtonPrimary } from '@atoms/Button';
import { Input } from '@atoms/Input';
import { AlertDanger } from '@atoms/Alert';

const LOGIN_TEAM = gql`
    mutation SigninTeam($email: String!, $password: String!, $teamId: Int!) {
        signinTeam(email: $email, password: $password, teamId: $teamId) {
            user {
                id
            }
            token
        }
    }
`;

export const LoginTeam: React.FC<{ team: GetTeamByName_teamDetailsFromName }> = ({ team }) => {
    const { handleSubmit, register } = useForm<FormData>();
    const [loginUser, { loading, error }] = useMutation<SigninTeam>(LOGIN_TEAM, {
        errorPolicy: 'none',
    });

    const submit = handleSubmit(async (data) => {
        if (!loading) {
            const result = await loginUser({
                variables: {
                    ...data,
                    teamId: team.id,
                },
            });
            await AuthToken.storeToken(result?.data?.signinTeam.token);
        }
    });

    return (
        <form style={{ width: '100%' }} onSubmit={!loading ? submit : undefined}>
            {error && <AlertDanger mb={3}>{error.message}</AlertDanger>}
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
        </form>
    );
};
