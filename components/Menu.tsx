import React from 'react';
import Link from 'next/link';
import { Flex, Text } from '@primer/components';
import { ButtonPrimary } from '@atoms/Button';

export const Menu: React.FC = () => {
    return (
        <Flex alignItems="center" justifyContent="flex-end">
            <Text mr={5}>
                <Link href="#">
                    <a>Features</a>
                </Link>
            </Text>
            <Text mr={5}>
                <Link href="/login">
                    <a>Login</a>
                </Link>
            </Text>
            <Link href="/signup">
                <ButtonPrimary>Signup</ButtonPrimary>
            </Link>
        </Flex>
    );
};
