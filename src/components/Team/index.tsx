import React from 'react';
import { Outlet, Navigate, useOutlet } from 'react-router-dom';

import { GetProjects_projects } from 'server-types/GetProjects';
import { GET_PROJECTS } from 'data/queries';

import { useQuery } from 'hooks/useQuery';
import { useCrux } from 'hooks/useCrux';

export const Team: React.FC = () => {
    const { team } = useCrux();
    const outlet = useOutlet();
    const { loading, error, data } = useQuery<GetProjects_projects[]>(GET_PROJECTS, {
        skip: !!outlet,
    });

    if (loading) {
        return <>Loading..</>;
    }

    if (error) {
        return <>{error.message}</>;
    }

    if (!outlet) {
        return <Navigate to={`/${team?.name}/projects/${data?.[0].sequence}`} />;
    }

    return <Outlet />;
};
