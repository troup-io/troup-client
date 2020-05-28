import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import DefaultError from 'next/error';
import { Flex, Heading } from '@primer/components';

import { GET_TEAM_BY_NAME } from '@queries';

import { GetTeamByName_teamDetailsFromName } from '@server-types/GetTeamByName';

import { useQuery } from '@hooks/useQuery';

import { Link } from '@atoms/Link';

import { Loading } from '@molecules/Loading';

// TODO-ss: Handle errors gracefully for form errors.

export const AuthWrapper: React.FC<{
    pageHeading: 'Login' | 'Signup';
    team: React.FunctionComponent<{ team?: GetTeamByName_teamDetailsFromName }>;
    user: React.FunctionComponent<{ team?: GetTeamByName_teamDetailsFromName }>;
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
    const isLogin = pageHeading === 'Login';

    if (loading) {
        return <Loading opacify />;
    }

    if (error) {
        return <DefaultError statusCode={404} />;
    }

    const getComponent = () => {
        if (isLogin) {
            return team ? <Team team={data} /> : <User />;
        }

        return team ? <User team={data} /> : <Team />;
    };

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

            {getComponent()}

            {!isLogin && (
                <Flex justifyContent="center">
                    Already a user? <Link href={team ? `/${team}/login` : '/login'}>Login now</Link>
                    .
                </Flex>
            )}
            {isLogin && (
                <Flex justifyContent="center">
                    Not a user?{' '}
                    <Link href={team ? `/${team}/signup` : '/signup'}>Register now</Link>.
                </Flex>
            )}
        </Flex>
    );
};
