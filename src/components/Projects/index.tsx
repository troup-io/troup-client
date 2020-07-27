import React, { useMemo } from 'react';
import { useParams, Navigate, useOutlet, Outlet } from 'react-router-dom';
import { Grid } from '@primer/components';

import { GetProjects_projects } from 'server-types/GetProjects';
import { GET_PROJECTS } from 'data/queries';

import { useCrux } from 'hooks/useCrux';
import { useQuery } from 'hooks/useQuery';

import { ProjectsSidebar } from 'components/Projects/ProjectsSidebar';
import { ProjectsContent } from 'components/Projects/ProjectsContent';

export const Projects: React.FC = () => {
    const { team } = useCrux();
    const { sequence } = useParams();
    const OutletComponent = useOutlet();
    const { loading, error, data } = useQuery<GetProjects_projects[]>(GET_PROJECTS);
    const navigateAway = !sequence;

    const currentData = useMemo<GetProjects_projects | undefined>(() => {
        if (!loading && data) {
            return data.find((project) => project.sequence === parseInt(sequence as string, 10));
        }
    }, [loading, data, sequence]);

    if (loading) {
        return <>Loading..</>;
    }

    if (error) {
        return <>{error.message}</>;
    }

    return (
        <Grid gridTemplateColumns="250px auto" gridTemplateRows="100%" height="100%" p={0}>
            <ProjectsSidebar loading={loading} data={data} />
            {navigateAway ? (
                <Navigate to={`/${team?.name}/projects/${data?.[0].sequence}`} replace />
            ) : OutletComponent ? (
                <Outlet />
            ) : (
                <ProjectsContent data={currentData} loading={loading} />
            )}
        </Grid>
    );
};
