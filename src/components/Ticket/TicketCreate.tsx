import React from 'react';

import { Spacer } from 'system/atoms/Spacer';
import { Input } from 'system/atoms/Input';

export const TicketCreate: React.FC = () => {
    return (
        <Spacer gap={2}>
            <h1>Create ticket</h1>
            <Input label="Title" placeholder="Enter a descriptive title for your ticket" />
        </Spacer>
    );
};
