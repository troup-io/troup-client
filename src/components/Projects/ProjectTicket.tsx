import moment from 'moment';
import styled from 'styled-components';
import { Grid, LabelGroup, Label, Box } from '@primer/components';

import { GetTickets_tickets } from '@server-types/GetTickets';

import { color, padding, borderRadius, transition } from '@styled/helper';

const ProjectTicketWraper = styled(Grid)`
    grid-auto-rows: max-content;
    ${padding(1.5)};
    ${borderRadius(1)};
    ${transition('background')};
    cursor: pointer;
    /* border-top: 1px solid ${color('baseLight')};

    &:first-of-type {
        border-top: none;
    } */

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
            <div>{data?.title}</div>
            <LabelGroup mt={2}>
                {data?.labels.map((label) => {
                    return (
                        <Label
                            key={label.id}
                            sx={{
                                background: label.background,
                            }}
                            color={label.foreground}
                        >
                            {label.value}
                        </Label>
                    );
                })}
            </LabelGroup>
            <ProjectTicketSubtext mt={2}>
                #{data?.sequence} created {dateDifference(data.createdAt)} by{' '}
                {data?.author.profile.firstName} {data?.author.profile.lastName}
            </ProjectTicketSubtext>
        </ProjectTicketWraper>
    );
};
