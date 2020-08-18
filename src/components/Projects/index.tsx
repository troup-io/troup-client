import React from 'react';

import { GetProjects_projects } from 'server-types/GetProjects';
import { GET_PROJECTS } from 'data/queries';

import { useQuery } from 'hooks/useQuery';

import { Input } from 'system/atoms/Input';
import { Spacer } from 'system/atoms/Spacer';

import { Loading } from 'system/molecules/Loading';

import { ProjectCard } from './ProjectCard';

export const Projects: React.FC = () => {
    const { loading, error, data } = useQuery<GetProjects_projects[]>(GET_PROJECTS);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <>{error.message}</>;
    }

    return (
        <>
            <Input placeholder="Search projects" />
            <Spacer gap={2} mt={2}>
                {data?.map((project) => (
                    <ProjectCard data={project} />
                ))}
            </Spacer>
        </>
    );
};
