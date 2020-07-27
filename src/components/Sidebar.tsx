import React from 'react';
import { useLocation } from 'react-router-dom';
import { Flex } from '@primer/components';
import styled from 'styled-components';
import {
    FolderOutline,
    ListOutline,
    PeopleOutline,
    LayersOutline,
    Settings2Outline,
    LogOutOutline,
} from '@styled-icons/evaicons-outline';

import { useCrux } from 'hooks/useCrux';
import { useAuth } from 'hooks/useAuth';

import { Link } from 'system/atoms/Link';
import { Dropdown, DropdownMenu, DropdownItem } from 'system/atoms/Dropdown';
import { AvatarText } from 'system/atoms/Avatar';
import { Spacer } from 'system/atoms/Spacer';

import { LogoIcon } from 'components/Logo';

import { padding, color, transition, margin, borderRadius } from 'styled/helper';

const SidebarWrapper = styled(Flex)`
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    ${padding(1, 0)};
    background: ${color('baseLight')};
    border-right: 2px solid ${color('base')};
`;

const SidebarSection = styled(Spacer)`
    flex-direction: column;
    align-items: center;
    color: ${color('darkDim')};
    text-align: center;
    justify-items: center;

    > a {
        display: flex;
        width: 100%;
        ${padding(0, 1)};
    }
`;

const SidebarLink = styled.span<{ selected?: boolean }>`
    position: relative;
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    align-self: stretch;
    height: 35px;
    ${margin(0, -1)};
    ${padding(0, 1)};
    line-height: normal;
    ${transition('all')};
    cursor: pointer;

    &:hover svg {
        color: ${(props) => (props.selected ? color('primaryDark') : color('light'))};
    }

    svg {
        color: ${(props) => (props.selected ? color('primaryDark') : color('darkDim'))};
    }

    &:before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        display: block;
        width: 5px;
        background: ${(props) => (props.selected ? color('primaryDark') : 'transparent')};
        ${borderRadius(0, 1, 1, 0)};
    }
`;

export default function Sidebar(): JSX.Element {
    const { user, team } = useCrux();
    const { logout } = useAuth();
    const location = useLocation();

    const currentItem = location.pathname.split('/')[2];

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
                <Link to={formLink('')}>
                    <LogoIcon />
                </Link>
                <Link to={formLink('projects')}>
                    <SidebarLink selected={currentItem === 'projects'}>
                        <FolderOutline height={25} width={25} />
                    </SidebarLink>
                </Link>
                <Link to={formLink('boards')}>
                    <SidebarLink selected={currentItem === 'boards'}>
                        <ListOutline height={25} width={25} />
                    </SidebarLink>
                </Link>
                <Link to={formLink('users')}>
                    <SidebarLink selected={currentItem === 'users'}>
                        <PeopleOutline height={25} width={25} />
                    </SidebarLink>
                </Link>
                <Link to={formLink('integrations')}>
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
