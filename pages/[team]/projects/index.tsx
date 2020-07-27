import React, { useEffect } from 'react';
import Router from 'next/router';

import { GET_PROJECTS } from 'data/queries';

import { useCrux } from 'hooks/useCrux';
import { useQuery } from 'hooks/useQuery';

import { Loading } from 'system/molecules/Loading';

import { DefaultError } from 'components/DefaultError';

import { withPrivateRoute } from '@with/privateRoute';

const Projects: React.FC = () => {
    const { team } = useCrux();
    const { data, error, loading } = useQuery(GET_PROJECTS);

    useEffect(() => {
        if (data && !loading && !error) {
            Router.push(
                `/[team]/projects/[sequence]`,
                `/${team?.name}/projects/${data[0].sequence}`,
                { shallow: true }
            );
        }
    }, [data, loading, error, team]);

    if (loading) {
        return <Loading opacify />;
    }

    if (error) {
        return <DefaultError status={500} message={error.message} />;
    }

    return null;
};

export default withPrivateRoute(Projects);
