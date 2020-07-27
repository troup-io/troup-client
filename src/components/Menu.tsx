import React from 'react';
import { Flex, Text } from '@primer/components';

import { Link } from 'system/atoms/Link';
import { ButtonPrimary } from 'system/atoms/Button';

export const Menu: React.FC = () => {
    return (
        <Flex alignItems="center" justifyContent="flex-end">
            <Text mr={5}>
                <Link to="#">Features</Link>
            </Text>
            <Text mr={5}>
                <Link to="/login">Login</Link>
            </Text>
            <Link to="/signup">
                <ButtonPrimary>Signup</ButtonPrimary>
            </Link>
        </Flex>
    );
};
