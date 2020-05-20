import React, { useState, useEffect, useContext, useRef, MouseEvent } from 'react';
import styled from 'styled-components';
import { SelectMenuProps, SelectMenu } from '@primer/components';

import { Input } from './Input';

import { color, borderRadius, margin, boxShadow, padding } from '@styled/helper';

export interface SelectOptionDefinition<T = any> {
    label: string;
    value: T;
    divider?: boolean;
}

type SelectProps<T = string | number | boolean> = SelectMenuProps & {
    options: SelectOptionDefinition<T>[];
    defaultValue?: SelectOptionDefinition<T>;
    header?: string;
    footer?: string;
    closeOnSelect?: boolean;
    autoFocus?: boolean;
    label?: string;
    name?: string;
    innerRef?: React.Ref<any>;
    onChange?: {
        (option: SelectOptionDefinition<T>): void;
    };
};

const SelectSummaryStyle = styled(Input)<{ label: string }>`
    position: relative;
    font-size: 14px;
    line-height: 20px;
    cursor: pointer;

    &:focus {
        outline: 0;
    }

    &:after {
        content: '${(props): any => props.label}';
        display: ${(props): any => (props.label ? 'block' : 'none')};
        position: absolute;
        top: 11px;
        left: 1px;
        ${padding(0, 0, 0, 1.25)};
        font-size: 0.65em;
        font-weight: 900;
        line-height: 1;
        text-transform: uppercase;
        opacity: 0.5;
        user-select: none;
    }

    > span[data-role="content"] {
        ${padding(0.1, 0.2)};
    }
`;

const SelectMenuModalStyle = styled(SelectMenu.Modal)`
    width: 100%;

    > div {
        ${margin(0.5, 0, 0)};
        background: ${color('light')};
        ${borderRadius(1)};
        ${boxShadow()};
    }
`;

const SelectItemStyle = styled(SelectMenu.Item)`
    background: ${color('light')};
    transition: all 0.25s ease;

    &:hover {
        color: ${color('light')};
        background: ${color('primaryDark')};
    }
`;

const SelectDividerStyle = styled(SelectMenu.Divider)`
    color: ${color('dark')};
    background: ${color('dim')};
`;

export const SelectInner: React.FC<SelectProps> = ({
    options,
    defaultValue,
    header,
    footer,
    closeOnSelect = true,
    autoFocus,
    placeholder,
    label,
    name,
    innerRef,
    onChange,
}) => {
    const isMounted = useRef(false);
    const { setOpen, open } = useContext(SelectMenu.MenuContext);
    const [selected, setValue] = useState<SelectOptionDefinition>(
        defaultValue ?? {
            value: '',
            label: '',
        }
    );
    const hasLabel =
        selected.label !== null && selected?.label !== undefined && selected?.label !== '';

    useEffect(() => {
        onChange && onChange(selected);
    }, [selected, onChange]);

    useEffect(() => {
        if (!isMounted.current && autoFocus && !open) {
            setOpen(true);
            isMounted.current = true;
        }
    }, [autoFocus, open, isMounted, setOpen]);

    const handleClick = (option) => (e: MouseEvent): void => {
        setValue(option);

        if (!closeOnSelect) {
            e.stopPropagation();
            e.preventDefault();
        }
    };

    return (
        <>
            <SelectSummaryStyle as="summary" autoFocus={autoFocus} label={label}>
                {hasLabel && <span data-role="content">{selected.label}</span>}
                {!hasLabel && (
                    <span data-role="content">{placeholder || 'Select an option..'}</span>
                )}
                <input type="hidden" value={selected.value} name={name} ref={innerRef} />
            </SelectSummaryStyle>
            <SelectMenuModalStyle>
                {!!header && <SelectMenu.Header>{header}</SelectMenu.Header>}
                <SelectMenu.List>
                    {options.map((option) => {
                        if (option.divider) {
                            return <SelectDividerStyle>{option.label}</SelectDividerStyle>;
                        }

                        return (
                            <SelectItemStyle
                                selected={selected.value === option.value}
                                onClick={handleClick(option)}
                            >
                                {option.label}
                            </SelectItemStyle>
                        );
                    })}
                </SelectMenu.List>
                {!!footer && <SelectMenu.Footer>{footer}</SelectMenu.Footer>}
            </SelectMenuModalStyle>
        </>
    );
};

export const Select: React.FC<SelectProps> = React.forwardRef((props, ref) => {
    const {
        options,
        defaultValue,
        header,
        footer,
        closeOnSelect = true,
        autoFocus,
        placeholder,
        label,
        name,
        onChange,
        ...rest
    } = props;

    const innerProps = {
        options,
        defaultValue,
        header,
        footer,
        closeOnSelect,
        autoFocus,
        placeholder,
        label,
        name,
        onChange,
    };

    return (
        <SelectMenu {...rest} sx={{ position: 'relative' }}>
            <SelectInner {...innerProps} innerRef={ref} />
        </SelectMenu>
    );
});
