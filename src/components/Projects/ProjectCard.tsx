import React from 'react';
import { Grid, Box } from '@primer/components';
import styled from 'styled-components';

import { GetProjects_projects } from 'server-types/GetProjects';

import { Link } from 'system/atoms/Link';

import { dateDifference } from 'utils';

import { color, padding, borderRadius, transition } from 'styled/helper';

const ProjectCardWrapper = styled(Grid)`
    grid-auto-rows: max-content;
    ${padding(1.5)};
    ${borderRadius(1)};
    ${transition('background')};
    cursor: pointer;

    > a {
        width: max-content;
        ${transition('color')};

        &:link,
        &:active,
        &:visited {
            color: inherit;
        }

        &:hover {
            color: ${color('primaryDark')};
        }
    }

    &:hover {
        background: ${color('baseLight')};
    }
`;

const ProjectCardSubtext = styled(Box)`
    color: ${color('darkDim')};
    font-size: 0.7rem;
`;

export const ProjectCard: React.FC<{ data?: GetProjects_projects }> = ({ data }) => {
    return (
        <ProjectCardWrapper>
            <Link to={`${data?.sequence}`}>{data?.name}</Link>
            <ProjectCardSubtext mt={2}>
                #{data?.sequence} created {dateDifference(data?.createdAt)}
            </ProjectCardSubtext>
        </ProjectCardWrapper>
    );
};
