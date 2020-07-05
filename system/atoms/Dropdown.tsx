import styled from 'styled-components';
import { Dropdown as _Dropdown } from '@primer/components';

import { color, boxShadow, margin, padding, borderRadius, darken } from '@styled/helper';

export const Dropdown = styled<typeof _Dropdown>(_Dropdown)`
    > summary {
        outline: 0;
        cursor: pointer;
    }
`;

Dropdown.defaultProps = {
    overlay: true,
};

export const DropdownMenu = styled(_Dropdown.Menu)`
    ${margin(1, 0, 1)};
    padding: 0 !important;
    background: ${color('light')};
    ${borderRadius(1)};
    ${boxShadow()};
`;

export const DropdownItem = styled(_Dropdown.Item)`
    display: flex;
    align-items: center;
    justify-content: flex-start;
    ${margin(1)};
    ${padding(0.75, 1)};
    ${borderRadius(1)};
    white-space: initial;
    cursor: pointer;
    transition: all 0.15s ease;

    &:hover,
    &:focus {
        color: ${color('light')};
        background: linear-gradient(
            to right,
            ${color('primaryDark')},
            ${darken('primaryDark', 0.25)}
        );
    }
`;
