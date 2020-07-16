import { useRouter } from 'next/router';
import styled from 'styled-components';

import { useCrux } from '@hooks/useCrux';

import { ButtonPrimary } from '@atoms/Button';
import { Link } from '@atoms/Link';
import { Spacer } from '@atoms/Spacer';

import { color, padding, transition } from '@styled/helper';

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

export const ProjectsSidebar: React.FC<{ loading: boolean; data: any[] }> = ({ loading, data }) => {
    const {
        query: { sequence },
    } = useRouter();
    const { team } = useCrux();

    if (loading) {
        return <>Loading...</>;
    }

    return (
        <ProjectsSidebarWrapper gap={20}>
            <ButtonPrimary>Add Project</ButtonPrimary>
            {loading
                ? 'Loading...'
                : data.map((project) => (
                      <Link
                          key={project.id}
                          href={`/[team]/projects/[sequence]`}
                          as={`/${team?.name}/projects/${project.sequence}`}
                          shallow
                          data-selected={sequence == project.sequence}
                      >
                          {project.name}
                      </Link>
                  ))}
        </ProjectsSidebarWrapper>
    );
};
