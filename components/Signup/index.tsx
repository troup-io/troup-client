import React from 'react';
import { useRouter } from 'next/router';
import { gql, useQuery } from '@apollo/client';

import { withRedirectUser, withApollo } from '../../with';

import { SignupTeam } from './SignupTeam';

const GET_TEAM_BY_NAME = gql`
    query GET_TEAM_BY_NAME($name: String!) {
        teamIdFromName(name: $name)
    }
`;

export const Signup: React.FC<null> = () => {
    const {
        query: { name },
    } = useRouter();
    const { data, error, loading } = useQuery(GET_TEAM_BY_NAME, {
        variables: {
            name,
        },
        skip: !name,
    });

    if (loading) {
        return <>Loading..</>;
    }

    if (error) {
        return (
            <pre
                style={{
                    padding: 10,
                    background: '#ee0000',
                    color: 'white',
                    overflowY: 'auto',
                    borderRadius: 10,
                }}
            >
                {error.message}
            </pre>
        );
    }

    if (name) {
        return <div>Team signup</div>;
    }

    return <SignupTeam />;
};

export default withRedirectUser(withApollo({ ssr: true })(Signup));
