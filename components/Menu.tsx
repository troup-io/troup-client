import React from 'react';
import { Flex, Text } from '@primer/components';

import { Link } from '@atoms/Link';
import { ButtonPrimary } from '@atoms/Button';

export const Menu: React.FC = () => {
    return (
        <Flex alignItems="center" justifyContent="flex-end">
            <Text mr={5}>
                <Link href="#">Features</Link>
            </Text>
            <Text mr={5}>
                <Link href="/login">Login</Link>
            </Text>
            <Link href="/signup">
                <ButtonPrimary>Signup</ButtonPrimary>
            </Link>
        </Flex>
    );
};
