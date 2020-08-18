import React, { Children, useState } from 'react';
import { TabNav as _TabNav, Box, BoxProps, Grid } from '@primer/components';
import styled, { css } from 'styled-components';
import { color, transition, borderRadius, margin } from 'styled/helper';

interface TabContainerProps extends BoxProps {
    initialTab?: number;
}

interface TabProps {
    number: number;
    title: React.ReactElement | string;
}

const TabContainer = styled(Box)`
    background: ${color('darker')};
    ${borderRadius(1)};
`;

const TabNav = styled(_TabNav)`
    background: ${color('dark')};
    border: 0;
    ${borderRadius(1, 1, 0, 0)};
    overflow: hidden;
`;

const TabItem = styled(_TabNav.Link)<{ active?: boolean }>`
    display: inline-block;
    ${margin(0, 0.1, 0, 0)};
    color: ${color('light')};
    font-weight: 400;
    background: ${color('dark')};
    ${transition(['color', 'background'])};
    cursor: pointer;

    &:hover {
        color: ${(props) => (props.active ? color('primaryDark') : color('light'))};
        background: ${color('darker')};
    }

    ${(props) =>
        props.active &&
        css`
            background: ${color('darker')};
            color: ${color('primaryDark')};
        `}
`;

export const TabInner = styled.div`
    width: 100%;
    height: 100%;
    background: ${color('darker')};
    ${borderRadius(0, 0, 1, 1)};
`;

export const Tab: React.FC<TabProps> = ({ children }) => {
    return <TabInner>{children}</TabInner>;
};

export const Tabs: React.FC<TabContainerProps> = ({ initialTab, children, ...boxProps }) => {
    const [currentTab, setCurrentTab] = useState<number>(initialTab ?? 1);

    const currentComponent = (): React.ReactElement<TabProps> | null | Record<string, unknown> => {
        return (
            Children.toArray(children).find((child: any) => child.props?.number === currentTab) ||
            null
        );
    };

    return (
        <TabContainer {...boxProps}>
            <Grid gridTemplateRows="max-content auto" height="100%">
                <TabNav>
                    {Children.map(children, (_child) => {
                        const child = _child as React.ReactElement<TabProps>;
                        return (
                            <TabItem
                                as="div"
                                onClick={() => setCurrentTab(child.props.number ?? 1)}
                                active={currentTab === child.props.number}
                            >
                                {child.props?.title}
                            </TabItem>
                        );
                    })}
                </TabNav>
                <TabInner>{currentComponent()}</TabInner>
            </Grid>
        </TabContainer>
    );
};
