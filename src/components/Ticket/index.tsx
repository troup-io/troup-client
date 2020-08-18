import React from 'react';
import { gql } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Label, Box } from '@primer/components';
import styled from 'styled-components';

import { GetTicket_ticket } from 'server-types/GetTicket';

import { useQuery } from 'hooks/useQuery';

import { Spacer } from 'system/atoms/Spacer';

import { Loading } from 'system/molecules/Loading';

import { DefaultError } from 'components/DefaultError';

import { dateDifference } from 'utils';

import { padding, color } from 'styled/helper';

const GET_TICKET = gql`
    query GetTicket($ticketSequence: Int!, $projectSequence: Int!) {
        ticket(ticketSequence: $ticketSequence, projectSequence: $projectSequence) {
            id
            createdAt
            sequence
            author {
                profile {
                    firstName
                    lastName
                }
            }
            labels {
                id
                value
                foreground
                background
            }
            title
            body
        }
    }
`;

const TicketWrapper = styled.div`
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
`;

const TicketInner = styled.div`
    width: 100%;
    max-width: 750px;
    margin: 0 auto;
    ${padding(1)};
`;

const TicketSubtext = styled(Box)`
    color: ${color('darkDim')};
    font-size: 0.7rem;
`;

export const Ticket: React.FC = () => {
    const { projectSequence, ticketSequence } = useParams();
    const { data, loading, error } = useQuery<GetTicket_ticket>(GET_TICKET, {
        variables: {
            ticketSequence: parseInt(ticketSequence, 10),
            projectSequence: parseInt(projectSequence, 10),
        },
    });

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <DefaultError status={500} message={error.message} />;
    }

    return (
        <TicketWrapper>
            <TicketInner>
                <h2>{data?.title}</h2>
                <TicketSubtext mb={2}>
                    #{data?.sequence} created {dateDifference(data?.createdAt)} by{' '}
                    {data?.author.profile.firstName} {data?.author.profile.lastName}
                </TicketSubtext>
                <Spacer row>
                    {data?.labels.map((label) => (
                        <Label
                            key={label.id}
                            sx={{
                                background: label.background,
                            }}
                            color={label.foreground ?? ''}
                        >
                            {label.value}
                        </Label>
                    ))}
                </Spacer>
                <Box mt={5}>{data?.body}</Box>
            </TicketInner>
        </TicketWrapper>
    );
};
