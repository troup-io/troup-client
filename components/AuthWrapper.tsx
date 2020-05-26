import React from 'react';
import { gql } from '@apollo/client';
import { useRouter } from 'next/router';
import Head from 'next/head';
import DefaultError from 'next/error';
import { Flex, Heading, Text } from '@primer/components';

import { GetTeamByName_teamDetailsFromName } from '@server-types/GetTeamByName';

import { useQuery } from '@hooks/useQuery';

import { Link } from '@atoms/Link';

import { Loading } from '@molecules/Loading';

const GET_TEAM_BY_NAME = gql`
    query GetTeamByName($name: String!) {
        teamDetailsFromName(name: $name) {
            id
            name
            displayName
        }
    }
`;

// TODO-ss: Handle errors gracefully for form errors.

export const AuthWrapper: React.FC<{
    pageHeading: 'Login' | 'Signup';
    team: React.FunctionComponent<{ team: GetTeamByName_teamDetailsFromName }>;
    user: React.FunctionComponent;
}> = ({ pageHeading, team: Team, user: User }) => {
    const {
        query: { team },
    } = useRouter();
    const { data, error, loading } = useQuery(GET_TEAM_BY_NAME, {
        variables: {
            name: team,
        },
        skip: !team,
    });

    if (loading) {
        return <Loading opacify />;
    }

    if (error) {
        return <DefaultError statusCode={404} />;
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
                    {data ? `${pageHeading} to ${data?.displayName ?? data?.name}` : pageHeading} -
                    Troup
                </title>
                <meta
                    name="title"
                    content={
                        data ? `${pageHeading} to ${data?.displayName ?? data?.name}` : pageHeading
                    }
                />
                <meta name="description" content="Description to go with OG:Title" />
            </Head>
            <Heading fontSize={5} mb={4}>
                {data ? `${pageHeading} to ${data?.displayName ?? data?.name}` : pageHeading}
            </Heading>
            {team ? <User /> : <Team team={data} />}
            {pageHeading === 'Signup' && (
                <Text>
                    Already a user? <Link href={team ? `/${team}/login` : '/login'}>Login now</Link>
                    .
                </Text>
            )}
            {pageHeading === 'Login' && (
                <Text>
                    Not a user?{' '}
                    <Link href={team ? `/${team}/signup` : '/signup'}>Register now</Link>.
                </Text>
            )}
        </Flex>
    );
};
