import React, { useRef } from 'react';
import { gql } from '@apollo/client';
import { useForm } from 'react-hook-form';

import { SignupTeam as SignupTeamType } from 'server-types/SignupTeam';

import { useAuth } from 'hooks/useAuth';

import { useMutation } from 'hooks/useMutation';

import { ButtonPrimary } from 'system/atoms/Button';
import { Input } from 'system/atoms/Input';
import { AlertDanger } from 'system/atoms/Alert';

import { Loading } from 'system/molecules/Loading';

import { AuthWrapper } from 'components/AuthWrapper';

type FormData = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    teamName: string;
};

const SIGNUP_TEAM = gql`
    mutation SignupTeam(
        $email: String!
        $password: String!
        $firstName: String!
        $lastName: String!
        $teamName: String!
    ) {
        signupTeam(
            email: $email
            password: $password
            firstName: $firstName
            lastName: $lastName
            teamName: $teamName
        ) {
            user {
                id
                ownerTeams {
                    id
                    name
                }
            }
            token
        }
    }
`;

export const Signup: React.FC = () => {
    const { login } = useAuth();
    const [signupTeam, { error, loading }] = useMutation<SignupTeamType>(SIGNUP_TEAM, {
        errorPolicy: 'none',
    });
    const { handleSubmit, register } = useForm<FormData>();

    const submit = handleSubmit(async (variables) => {
        if (!loading) {
            const result = await signupTeam({
                variables,
            });
            await login(result?.data?.signupTeam?.token || '');
        }
    });

    const rand = useRef(Math.floor(Math.random() * 100)).current;

    return (
        <AuthWrapper pageHeading="Signup">
            <form style={{ width: '100%' }} onSubmit={!loading ? submit : undefined}>
                {loading && <Loading size={50} />}
                {error && <AlertDanger mb={3}>{error.message}</AlertDanger>}
                <Input
                    marginBottom={3}
                    label="Email"
                    type="email"
                    name="email"
                    block
                    defaultValue={`samrith_${rand}@me.com`}
                    ref={register({ required: true })}
                    tabIndex={0}
                />
                <Input
                    marginBottom={3}
                    label="Password"
                    type="password"
                    name="password"
                    block
                    defaultValue="helloworld"
                    ref={register({ required: true })}
                />
                <Input
                    marginBottom={3}
                    label="First Name"
                    type="text"
                    name="firstName"
                    block
                    defaultValue={`Samrith ${rand}`}
                    ref={register({ required: true })}
                />
                <Input
                    marginBottom={3}
                    label="Last Name"
                    type="text"
                    name="lastName"
                    block
                    defaultValue={`Shankar ${rand}`}
                    ref={register({ required: true })}
                />
                <Input
                    marginBottom={3}
                    label="Team Name"
                    type="text"
                    name="teamName"
                    block
                    defaultValue={`team-${rand}`}
                    ref={register({ required: true })}
                />
                <ButtonPrimary type="submit" disabled={loading} fullWidth mb={4}>
                    {loading ? 'Loading..' : 'Submit'}
                </ButtonPrimary>
                {error && error?.message}
            </form>
        </AuthWrapper>
    );
};
