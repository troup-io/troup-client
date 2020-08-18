import React from 'react';
import { gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Grid, Flex } from '@primer/components';
import styled from 'styled-components';

import { GetProject_project } from 'server-types/GetProject';
import { GetTickets_tickets } from 'server-types/GetTickets';
import { GET_TICKETS } from 'data/queries';

import { useQuery } from 'hooks/useQuery';

import { ButtonSuccess } from 'system/atoms/Button';
import { Input } from 'system/atoms/Input';
import { Link } from 'system/atoms/Link';
import { Spacer } from 'system/atoms/Spacer';

import { Loading } from 'system/molecules/Loading';

import { DefaultError } from 'components/DefaultError';

import { TicketCard } from './TicketCard';

import { color, padding } from 'styled/helper';

const GET_PROJECT = gql`
    query GetProject($sequence: Int!) {
        project(sequence: $sequence) {
            id
            sequence
            name
            members {
                profile {
                    firstName
                    lastName
                }
            }
        }
    }
`;

const TicketsHeader = styled.div`
    position: sticky;
    top: 0;
    left: auto;
    display: grid;
    grid-template-rows: auto auto;
    grid-template-columns: auto;
    row-gap: 10px;
    align-items: center;
    width: 100%;
    height: max-content;
    ${padding(1, 0, 0)};
    background: ${color('base')};

    > button {
        flex-shrink: 0;
    }
`;

export const Tickets: React.FC = () => {
    const { projectSequence } = useParams();
    const { data: projectData, loading: projectLoading, error: projectError } = useQuery<
        GetProject_project
    >(GET_PROJECT, {
        variables: {
            sequence: parseInt(projectSequence, 10),
        },
    });
    const { data: ticketsData, loading: ticketsLoading, error: ticketsError } = useQuery<
        GetTickets_tickets[]
    >(GET_TICKETS, {
        variables: {
            projectSequence: parseInt(projectSequence, 10),
        },
    });

    const loading = projectLoading || ticketsLoading;
    const error = projectError || ticketsError;

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <DefaultError status={500} message={error.message} />;
    }

    if (!projectData || !ticketsData) {
        return <DefaultError status={500} />;
    }

    return (
        <>
            <TicketsHeader>
                <Grid
                    gridTemplateColumns="auto max-content"
                    gridColumnGap={2}
                    alignItems="max-content"
                >
                    <h1>{projectData?.name}</h1>
                    <Flex alignItems="center">
                        <ButtonSuccess as={Link} to="create">
                            Create Ticket
                        </ButtonSuccess>
                    </Flex>
                </Grid>
                <Input placeholder="Search" />
            </TicketsHeader>
            <Spacer mt={3}>
                {ticketsData?.map((ticket) => (
                    <TicketCard data={ticket} />
                ))}
            </Spacer>
        </>
    );
};
