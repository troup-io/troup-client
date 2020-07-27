import React from 'react';
import moment from 'moment';
import { Grid, LabelGroup, Label, Box } from '@primer/components';
import styled from 'styled-components';

import { GetTickets_tickets } from 'server-types/GetTickets';

import { color, padding, borderRadius, transition } from 'styled/helper';
import { Link } from 'system/atoms/Link';

const ProjectTicketWraper = styled(Grid)`
    grid-auto-rows: max-content;
    ${padding(1.5)};
    ${borderRadius(1)};
    ${transition('background')};
    cursor: pointer;

    > a {
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

const ProjectTicketSubtext = styled(Box)`
    color: ${color('darkDim')};
    font-size: 0.7rem;
`;

const dateDifference = (date: string): string => {
    const d = moment(date);

    if (d.diff(Date.now(), 'days') > 7) {
        return `on ${d.format('D MMM YYYY')}`;
    }

    return d.fromNow();
};

export const ProjectTicket: React.FC<{ data?: GetTickets_tickets }> = ({ data }) => {
    return (
        <ProjectTicketWraper>
            <Link to={`ticket/${data?.sequence}`}>{data?.title}</Link>
            <LabelGroup mt={2}>
                {data?.labels.map((label) => {
                    return (
                        <Label
                            key={label.id}
                            sx={{
                                background: label.background,
                            }}
                            color={label.foreground ?? ''}
                        >
                            {label.value}
                        </Label>
                    );
                })}
            </LabelGroup>
            <ProjectTicketSubtext mt={2}>
                #{data?.sequence} created {dateDifference(data?.createdAt)} by{' '}
                {data?.author.profile.firstName} {data?.author.profile.lastName}
            </ProjectTicketSubtext>
        </ProjectTicketWraper>
    );
};
