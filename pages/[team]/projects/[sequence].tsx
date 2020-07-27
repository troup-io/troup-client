import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { Grid } from '@primer/components';

import { GET_PROJECTS } from 'data/queries';

import { useQuery } from 'hooks/useQuery';

import { ProjectsSidebar } from 'components/Projects/ProjectsSidebar';
import { ProjectsContent } from 'components/Projects/ProjectsContent';

import { withPrivateRoute } from '@with/privateRoute';
import { GetProjects_projects } from '@server-types/GetProjects';

const Project: React.FC = () => {
    const {
        query: { sequence },
    } = useRouter();
    const { loading, error, data } = useQuery<GetProjects_projects[]>(GET_PROJECTS);

    const currentData = useMemo<GetProjects_projects | null>(() => {
        if (!loading && data) {
            return data.find((project) => project.sequence === parseInt(sequence as string, 10));
        }

        return null;
    }, [loading, data, sequence]);

    if (error) {
        return <>{error.message}</>;
    }

    return (
        <Grid gridTemplateColumns="250px auto" gridTemplateRows="100%" height="100%" p={0}>
            <ProjectsSidebar loading={loading} data={data} />
            <ProjectsContent data={currentData} loading={loading} />
        </Grid>
    );
};

export default withPrivateRoute(Project);
