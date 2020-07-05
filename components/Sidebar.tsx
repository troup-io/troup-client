import React from 'react';
import { useRouter } from 'next/router';
import { Flex } from '@primer/components';
import styled from 'styled-components';

import { useCrux } from '@hooks/useCrux';

import { LogoIcon } from '@logo';

import { Link } from '@atoms/Link';
import { Dropdown, DropdownMenu, DropdownItem } from '@atoms/Dropdown';
import { AvatarText } from '@atoms/Avatar';
import { Spacer } from '@atoms/Spacer';

import { logout } from '@utils';

import { padding, color, transition } from '@styled/helper';

import {
    FolderOutline,
    ListOutline,
    PeopleOutline,
    LayersOutline,
    Settings2Outline,
    LogOutOutline,
} from '@icons';

const SidebarWrapper = styled(Flex)`
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    ${padding(1)};
    background: ${color('black')};
`;

const SidebarSection = styled(Spacer)`
    flex-direction: column;
    align-items: center;
    color: ${color('darkDim')};
    text-align: center;
    justify-items: center;
`;

const SidebarLink = styled.span<{ selected?: boolean }>`
    ${transition('all')};
    cursor: pointer;

    &:hover svg {
        color: ${(props) => (props.selected ? color('primaryDark') : color('light'))};
    }

    svg {
        color: ${(props) => (props.selected ? color('primaryDark') : color('darkDim'))};
    }
`;

export default function Sidebar() {
    const router = useRouter();
    const { user, team } = useCrux();

    const currentItem = router.pathname.split('/')[2];

    const {
        profile: { firstName = '', lastName = '' },
    } = user || {
        profile: {},
    };

    const avatarChar = firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();

    const formLink = (item: string, pseudo?: boolean): string =>
        `/${pseudo ? `[team]` : team?.name}/${item}`;

    return (
        <SidebarWrapper>
            <SidebarSection gap={30}>
                <Link href={formLink('', true)} as={formLink('')}>
                    <LogoIcon />
                </Link>
                <Link href={formLink('projects', true)} as={formLink('projects')}>
                    <SidebarLink selected={currentItem === 'projects'}>
                        <FolderOutline height={25} width={25} />
                    </SidebarLink>
                </Link>
                <Link href={formLink('boards')}>
                    <SidebarLink selected={currentItem === 'boards'}>
                        <ListOutline height={25} width={25} />
                    </SidebarLink>
                </Link>
                <Link href={formLink('users')}>
                    <SidebarLink selected={currentItem === 'users'}>
                        <PeopleOutline height={25} width={25} />
                    </SidebarLink>
                </Link>
                <Link href={formLink('integrations')}>
                    <SidebarLink selected={currentItem === 'integrations'}>
                        <LayersOutline height={25} width={25} />
                    </SidebarLink>
                </Link>
            </SidebarSection>
            <SidebarSection>
                <Dropdown>
                    <summary>
                        <AvatarText size={40}>{avatarChar}</AvatarText>
                    </summary>
                    <DropdownMenu direction="ne">
                        <DropdownItem onClick={logout}>
                            <LogOutOutline height={15} width={15} style={{ marginRight: 10 }} />
                            Logout
                        </DropdownItem>
                        <DropdownItem>
                            <Settings2Outline height={15} width={15} style={{ marginRight: 10 }} />
                            Settings
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </SidebarSection>
        </SidebarWrapper>
    );
}
