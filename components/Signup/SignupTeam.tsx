import React, { useRef } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useForm } from 'react-hook-form';

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
                teams {
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
        await signupUser({
            variables,
        });
    });

    const rand = useRef(Math.floor(Math.random() * 100)).current;

    return (
        <>
            <form onSubmit={!loading ? submit : undefined}>
                <p>
                    <input
                        type="email"
                        name="email"
                        defaultValue={`samrith_${rand}@me.com`}
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
                <p>
                    <input
                        type="text"
                        name="firstName"
                        defaultValue={`Samrith ${rand}`}
                        ref={register({ required: true })}
                    />
                </p>
                <p>
                    <input
                        type="text"
                        name="lastName"
                        defaultValue={`Shankar ${rand}`}
                        ref={register({ required: true })}
                    />
                </p>
                <p>
                    <input
                        type="text"
                        name="teamName"
                        defaultValue={`team-${rand}`}
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
