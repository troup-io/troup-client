import React from 'react';
import { useRouter } from 'next/router';
import { gql } from '@apollo/client';
import Head from 'next/head';
import { Flex, Heading, Text } from '@primer/components';

import { withRedirectUser } from '@with/redirectUser';
import { withApollo } from '@with/apollo';

import { useQuery } from '@hooks/useQuery';

import { Link } from '@atoms/Link';

import { Loading } from '@molecules/Loading';

import { SignupTeam } from './SignupTeam';
import { SignupUser } from './SignupUser';

const GET_TEAM_BY_NAME = gql`
    query GET_TEAM_BY_NAME($name: String!) {
        teamDetailsFromName(name: $name) {
            id
            name
            displayName
        }
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
        return <Loading opacify />;
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

    return (
        <Flex
            flexDirection="column"
            justifyContent="center"
            maxWidth={350}
            height="100%"
            m="auto"
            p="0 20px"
        >
            <Head>
                <title>
                    {data ? `Signup to ${data?.displayName ?? data?.name}` : 'Signup'} - Troup
                </title>
                <meta
                    name="title"
                    content={data ? `Signup to ${data?.displayName ?? data?.name}` : 'Signup'}
                />
                <meta name="description" content="Description to go with OG:Title" />
            </Head>
            <Heading fontSize={5} mb={4}>
                {data ? `Signup to ${data?.displayName ?? data?.name}` : 'Signup'}
            </Heading>
            {name ? <SignupUser team={data} /> : <SignupTeam />}
            <Text>
                Already a user? <Link href={`/login`}>Login!</Link>
            </Text>
        </Flex>
    );
};

export default withRedirectUser(withApollo({ ssr: false })(Signup));
