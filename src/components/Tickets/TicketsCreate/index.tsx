import React from 'react';

import { Spacer } from 'system/atoms/Spacer';
import { Input } from 'system/atoms/Input';

import { Editor } from 'components/Editor';
import { Box } from '@primer/components';

export const TicketsCreate: React.FC = () => {
    return (
        <Spacer gap={20}>
            <h1>Create ticket</h1>
            <Input placeholder="Title" />
            <Box mb={3}>
                <Editor />
            </Box>
        </Spacer>
    );
};
