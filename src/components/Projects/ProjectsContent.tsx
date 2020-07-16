import { gql } from '@apollo/client';
import styled from 'styled-components';
import { Grid } from '@primer/components';

import { GetProjects_projects } from '@server-types/GetProjects';
import { GetTickets_tickets } from '@server-types/GetTickets';

import { useQuery } from '@hooks/useQuery';

import { ProjectTicket } from './ProjectTicket';

import { padding } from '@styled/helper';
import { Input } from '@atoms/Input';

const GET_TICKETS = gql`
    query GetTickets($projectId: Int!) {
        tickets(projectId: $projectId) {
            id
            sequence
            createdAt
            title
            author {
                profile {
                    firstName
                    lastName
                }
            }
            labels {
                id
                foreground
                background
                value
            }
        }
    }
`;

const ProjectsContentWrapper = styled(Grid)`
    grid-template-rows: max-content auto;
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

const ProjectsContentHeader = styled.div`
    height: max-content;
    ${padding(1, 5, 0)};
`;

const ProjectsTicketsWrapper = styled(Grid)`
    grid-auto-rows: max-content;
    grid-template-columns: minmax(75%, 750px);
    row-gap: 10px;
    justify-content: center;
    ${padding(3, 5, 1)};
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
`;

export const ProjectsContent: React.FC<{ loading: boolean; data?: GetProjects_projects }> = ({
    loading,
    data,
}) => {
    const { data: ticketsData, error: ticketsError, loading: ticketsLoading } = useQuery<
        GetTickets_tickets[]
    >(GET_TICKETS, {
        skip: loading || !data,
        variables: {
            projectId: data?.id,
        },
    });

    if (loading || ticketsLoading) {
        return <>Loading..</>;
    }

    if (ticketsError) {
        return <>{ticketsError.message}</>;
    }

    return (
        <ProjectsContentWrapper>
            <ProjectsContentHeader>
                <h1>{data.name}</h1>
                <Input placeholder="Search" />
            </ProjectsContentHeader>
            <ProjectsTicketsWrapper>
                {ticketsData.map((ticket) => (
                    <ProjectTicket key={ticket.id} data={ticket} />
                ))}
            </ProjectsTicketsWrapper>
        </ProjectsContentWrapper>
    );
};
