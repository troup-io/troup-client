import React, { useRef } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { AuthToken } from '../../services/Auth';
import { Button } from '../../styled/components/Button';
import { Input } from '../../styled/components/Input';

type FormData = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    teamName: string;
};

const SIGNUP_USER_MUTATION = gql`
    mutation SIGNUP_MUTATION(
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

export const SignupTeam: React.FC<{}> = () => {
    const [signupUser, { data, error, loading }] = useMutation(SIGNUP_USER_MUTATION, {
        errorPolicy: 'none',
    });
    const { handleSubmit, register } = useForm<FormData>();

    const submit = handleSubmit(async (variables) => {
        const result = (await signupUser({
            variables,
        })) as any;
        await AuthToken.storeToken(result.data?.token);
    });

    const rand = useRef(Math.floor(Math.random() * 100)).current;

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexFlow: 'column',
                width: 500,
                height: '100%',
                margin: '0 auto',
            }}
        >
            <form style={{ width: '100%' }} onSubmit={!loading ? submit : undefined}>
                Hello World
                <p>
                    <Input
                        placeholder="Email"
                        type="email"
                        name="email"
                        defaultValue={`samrith_${rand}@me.com`}
                        ref={register({ required: true })}
                    />
                </p>
                <p>
                    <Input
                        placeholder="Password"
                        type="password"
                        name="password"
                        defaultValue="helloworld"
                        ref={register({ required: true })}
                    />
                </p>
                <p>
                    <Input
                        placeholder="First Name"
                        type="text"
                        name="firstName"
                        defaultValue={`Samrith ${rand}`}
                        ref={register({ required: true })}
                    />
                </p>
                <p>
                    <Input
                        placeholder="Last Name"
                        type="text"
                        name="lastName"
                        defaultValue={`Shankar ${rand}`}
                        ref={register({ required: true })}
                    />
                </p>
                <p>
                    <Input
                        placeholder="Team Name"
                        type="text"
                        name="teamName"
                        defaultValue={`team-${rand}`}
                        ref={register({ required: true })}
                    />
                </p>
                <Button type="submit" disabled={loading}>
                    {loading ? 'Loading..' : 'Submit'}
                </Button>
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
        </div>
    );
};
