import React from 'react';
import { useLocation } from 'react-router-dom';
import { Flex } from '@primer/components';
import styled from 'styled-components';
import { Folder, List, Users, LayerGroup, Cog, SignOutAlt } from '@styled-icons/fa-solid';

import { useCrux } from 'hooks/useCrux';
import { useAuth } from 'hooks/useAuth';

import { Link } from 'system/atoms/Link';
import { Dropdown, DropdownMenu, DropdownItem } from 'system/atoms/Dropdown';
import { AvatarText } from 'system/atoms/Avatar';
import { Spacer } from 'system/atoms/Spacer';

import { LogoIcon } from 'components/Logo';

import { padding, color, transition, margin, borderRadius } from 'styled/helper';

const SidebarWrapper = styled(Flex)`
    justify-content: space-between;
    align-items: center;
    height: 100%;
    ${padding(1)};
    background: ${color('baseLight')};
    border-bottom: 2px solid ${color('base')};
`;

const SidebarSection = styled(Spacer)`
    flex-direction: column;
    align-items: center;
    color: ${color('darkDim')};
    text-align: center;
    justify-items: center;

    > a {
        display: flex;
        justify-self: stretch;
        height: 100%;
        ${padding(0, 1)};
    }
`;

const SidebarLink = styled.span<{ selected?: boolean }>`
    position: relative;
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: center;
    justify-self: stretch;
    height: 150%;
    ${margin(-1, 0)};
    ${padding(1, 0.5)};
    color: ${(props) => (props.selected ? color('primaryDark') : color('darkDim'))};
    line-height: normal;
    ${transition('all')};
    cursor: pointer;

    &:hover {
        color: ${(props) => (props.selected ? color('primaryDark') : color('light'))};

        svg {
            color: ${(props) => (props.selected ? color('primaryDark') : color('light'))};
        }
    }

    svg {
        ${margin(-0.25, 1, 0, 0)};
        color: ${(props) => (props.selected ? color('primaryDark') : color('darkDim'))};
        ${transition('all')};
    }

    &:before {
        content: '';
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        display: block;
        height: 5px;
        background: ${(props) => (props.selected ? color('primaryDark') : 'transparent')};
        ${borderRadius(0, 0, 1, 1)};
        ${transition('background')};
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
            <SidebarSection gap={30} row>
                <Link to={formLink('')}>
                    <LogoIcon />
                </Link>
                <Link to={formLink('projects')}>
                    <SidebarLink selected={currentItem === 'projects'}>
                        <Folder height={20} width={20} /> Projects
                    </SidebarLink>
                </Link>
                <Link to={formLink('boards')}>
                    <SidebarLink selected={currentItem === 'boards'}>
                        <List height={20} width={20} /> Boards
                    </SidebarLink>
                </Link>
                <Link to={formLink('users')}>
                    <SidebarLink selected={currentItem === 'users'}>
                        <Users height={20} width={20} /> Users
                    </SidebarLink>
                </Link>
                <Link to={formLink('integrations')}>
                    <SidebarLink selected={currentItem === 'integrations'}>
                        <LayerGroup height={20} width={20} /> Integrations
                    </SidebarLink>
                </Link>
            </SidebarSection>
            <SidebarSection>
                <Dropdown>
                    <summary>
                        <AvatarText size={40}>{avatarChar}</AvatarText>
                    </summary>
                    <DropdownMenu direction="sw">
                        <DropdownItem onClick={logout}>
                            <SignOutAlt height={15} width={15} style={{ marginRight: 10 }} />
                            Logout
                        </DropdownItem>
                        <DropdownItem>
                            <Cog height={15} width={15} style={{ marginRight: 10 }} />
                            Settings
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </SidebarSection>
        </SidebarWrapper>
    );
}
