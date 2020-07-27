import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { ButtonPrimary } from 'system/atoms/Button';
import { Link } from 'system/atoms/Link';
import { Spacer } from 'system/atoms/Spacer';

import { color, padding, transition } from 'styled/helper';
import { GetProjects_projects } from 'server-types/GetProjects';
import { useCrux } from 'hooks/useCrux';

const ProjectsSidebarWrapper = styled(Spacer)`
    height: 100%;
    ${padding(1.5, 2)};
    background: ${color('baseLight')};

    > a {
        ${transition('color')};

        &:link,
        &:visited,
        &:active {
            color: ${color('darkDimmer')};
        }

        &:hover {
            color: ${color('light')};
        }

        &[data-selected='true'] {
            &:link,
            &:visited,
            &:active {
                color: ${color('primaryDark')};
            }
        }
    }
`;

export const ProjectsSidebar: React.FC<{
    loading: boolean;
    data?: GetProjects_projects[];
}> = ({ loading, data }) => {
    const { team } = useCrux();
    const { sequence } = useParams();

    if (loading) {
        return <>Loading...</>;
    }

    return (
        <ProjectsSidebarWrapper gap={20}>
            <ButtonPrimary>Add Project</ButtonPrimary>
            {loading
                ? 'Loading...'
                : data?.map((project) => (
                      <Link
                          key={project.id}
                          to={`/${team?.name}/projects/${project.sequence}`}
                          replace
                          data-selected={parseInt(sequence, 10) === project.sequence}
                      >
                          {project.name}
                      </Link>
                  ))}
        </ProjectsSidebarWrapper>
    );
};
