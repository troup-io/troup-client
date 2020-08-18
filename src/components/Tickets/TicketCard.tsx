import React from 'react';
import { Grid, Box, LabelGroup, Label } from '@primer/components';
import styled from 'styled-components';

import { GetTickets_tickets } from 'server-types/GetTickets';

import { Link } from 'system/atoms/Link';

import { dateDifference } from 'utils';

import { color, padding, borderRadius, transition } from 'styled/helper';

const TicketCardWrapper = styled(Grid)`
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

const TicketCardSubtext = styled(Box)`
    color: ${color('darkDim')};
    font-size: 0.7rem;
`;

export const TicketCard: React.FC<{ data?: GetTickets_tickets }> = ({ data }) => {
    return (
        <TicketCardWrapper>
            <Link to={`${data?.sequence}`}>{data?.title}</Link>
            <LabelGroup mt={2}>
                {data?.labels.map((label) => (
                    <Label
                        key={label.id}
                        sx={{
                            background: label.background,
                        }}
                        color={label.foreground ?? '#222'}
                    >
                        {label.value}
                    </Label>
                ))}
            </LabelGroup>
            <TicketCardSubtext mt={1}>
                #{data?.sequence} created {dateDifference(data?.createdAt)}
            </TicketCardSubtext>
        </TicketCardWrapper>
    );
};
