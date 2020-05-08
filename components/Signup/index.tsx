import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { gql, useLazyQuery } from '@apollo/client';

import { withApollo } from '../../lib/apollo';
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
    const [getTeam, { data, error, loading }] = useLazyQuery(GET_TEAM_BY_NAME, {
        variables: {
            name,
        },
    });

    useEffect(() => {
        if (name) {
            getTeam();
        }
    }, [getTeam, name]);

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

    if (name && data) {
        return <div>Team signup</div>;
    }

    return <SignupTeam />;
};

export default withApollo({ ssr: true })(Signup);
