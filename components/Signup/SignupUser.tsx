import React, { useRef } from 'react';
import { gql } from '@apollo/client';
import { useForm } from 'react-hook-form';

import { GetTeamByName_teamDetailsFromName } from '@server-types/GetTeamByName';
import { SignupUser as SignupUserType } from '@server-types/SignupUser';

import { AuthToken } from '@services/Auth';

import { useMutation } from '@hooks/useMutation';

import { ButtonPrimary } from '@atoms/Button';
import { Input } from '@atoms/Input';
import { AlertDanger } from '@atoms/Alert';

import { Loading } from '@molecules/Loading';

type FormData = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    teamId: string;
};

const SIGNUP_USER = gql`
    mutation SignupUser(
        $email: String!
        $password: String!
        $firstName: String!
        $lastName: String!
        $teamId: Int!
    ) {
        signupUser(
            email: $email
            password: $password
            firstName: $firstName
            lastName: $lastName
            teamId: $teamId
        ) {
            user {
                id
                memberTeams {
                    id
                    name
                }
            }
            token
        }
    }
`;

export const SignupUser: React.FC<{
    team: GetTeamByName_teamDetailsFromName;
}> = ({ team }) => {
    const [signupUser, { error, loading }] = useMutation<SignupUserType>(SIGNUP_USER, {
        errorPolicy: 'none',
    });
    const { handleSubmit, register } = useForm<FormData>();

    const submit = handleSubmit(async (variables) => {
        if (!loading) {
            const result = await signupUser({
                variables: {
                    ...variables,
                    teamId: team.id,
                },
            });
            await AuthToken.storeToken(result.data?.signupUser.token);
        }
    });

    const rand = useRef(Math.floor(Math.random() * 100)).current;

    return (
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
            <ButtonPrimary type="submit" disabled={loading} fullWidth mb={4}>
                {loading ? 'Loading..' : 'Submit'}
            </ButtonPrimary>
        </form>
    );
};
