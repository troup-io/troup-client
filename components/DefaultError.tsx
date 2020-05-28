import React from 'react';
import { Flex } from '@primer/components';
import styled from 'styled-components';
import { color, margin } from '@styled/helper';
import Head from 'next/head';

const StatusCode = styled.h1`
    ${margin(0, 0, 3.5)};
    font-size: 8em;
    line-height: 1;
    background: linear-gradient(${color('primaryLight')}, ${color('primaryDark')});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

export const DefaultError: React.FC<{ status: number; message?: string; title?: string }> = ({
    status,
    message,
    title,
}) => {
    return (
        <>
            <Head>
                <title>{title || 'Uh, oh!'}</title>
            </Head>
            <Flex
                height="100%"
                width="100%"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
            >
                <StatusCode>{status}</StatusCode>
                {message}
            </Flex>
        </>
    );
};
