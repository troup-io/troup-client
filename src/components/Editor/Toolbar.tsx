import React from 'react';
import {
    ToolbarMark,
    ToolbarElement,
    ToolbarImage,
    ToolbarAlign,
    ToolbarLink,
    MARK_BOLD,
    MARK_ITALIC,
    MARK_STRIKETHROUGH,
    MARK_CODE,
    ELEMENT_BLOCKQUOTE,
    ELEMENT_CODE_BLOCK,
    ELEMENT_H1,
    ELEMENT_H2,
    ELEMENT_ALIGN_LEFT,
    ELEMENT_ALIGN_CENTER,
    ELEMENT_ALIGN_RIGHT,
    ELEMENT_H3,
} from '@udecode/slate-plugins';
import styled from 'styled-components';
import {
    Bold,
    Italic,
    Strikethrough,
    Code,
    QuoteRight,
    Terminal,
    Heading,
    Image,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Link,
} from '@styled-icons/fa-solid';

import { EditorOptions } from './editor-options';

import { color, padding, rgba, transition, margin, borderRadius, darken } from 'styled/helper';

const ToolbarWrapper = styled.div`
    position: sticky;
    top: -20px;
    left: 0;
    display: grid;
    grid-auto-columns: max-content;
    grid-auto-flow: column;
    column-gap: 10px;
    height: max-content;
    ${margin(-1)};
    ${padding(2, 2, 2.5)};
    background: linear-gradient(to bottom, ${color('darker')} 50%, transparent);
    border: 0;
    ${borderRadius(1, 1, 0, 0)};
    z-index: 2;
`;

const ToolbarSection = styled.div`
    display: grid;
    grid-auto-columns: auto;
    grid-auto-flow: column;
    flex-shrink: 0;
    background: ${darken('darker', 0.07)};
    background-clip: padding-box;
    ${borderRadius(1)};
    overflow: hidden;

    > .slate-ToolbarButton {
        width: max-content;
        height: max-content;
        display: inline-flex;
        ${padding(0.5, 0.75)};
        color: ${color('darkDim')};
        font-size: 0.8rem;
        border-right: 1px solid ${rgba('darkDim', 0.1)};
        ${transition('all')};

        &:last-of-type {
            border-right: 0;
        }

        &:hover {
            color: ${color('dim')};
        }

        &-active {
            color: ${color('light')};
            background: ${color('dark')};
        }

        > svg {
            width: 22px;
            height: 22px;
            ${padding(0.3)};
        }
    }
`;

export const Toolbar: React.FC = () => {
    return (
        <ToolbarWrapper>
            <ToolbarSection>
                <ToolbarMark type={MARK_BOLD} icon={<Bold />} tooltip={{ content: 'Bold' }} />
                <ToolbarMark type={MARK_ITALIC} icon={<Italic />} />
                <ToolbarMark type={MARK_STRIKETHROUGH} icon={<Strikethrough />} />
                <ToolbarMark type={MARK_CODE} icon={<Code />} />
                <ToolbarLink {...EditorOptions} icon={<Link />} />
            </ToolbarSection>
            <ToolbarSection>
                <ToolbarElement
                    type={ELEMENT_H1}
                    icon={
                        <>
                            <Heading /> 1
                        </>
                    }
                />
                <ToolbarElement
                    type={ELEMENT_H2}
                    icon={
                        <>
                            <Heading /> 2
                        </>
                    }
                />
                <ToolbarElement
                    type={ELEMENT_H3}
                    icon={
                        <>
                            <Heading /> 3
                        </>
                    }
                />
            </ToolbarSection>
            <ToolbarSection>
                <ToolbarElement type={ELEMENT_BLOCKQUOTE} icon={<QuoteRight />} />
                <ToolbarElement type={ELEMENT_CODE_BLOCK} icon={<Terminal />} />
            </ToolbarSection>
            <ToolbarSection>
                <ToolbarImage {...EditorOptions} icon={<Image />} />
            </ToolbarSection>
            <ToolbarSection>
                <ToolbarAlign type={ELEMENT_ALIGN_LEFT} icon={<AlignLeft />} />
                <ToolbarAlign type={ELEMENT_ALIGN_CENTER} icon={<AlignCenter />} />
                <ToolbarAlign type={ELEMENT_ALIGN_RIGHT} icon={<AlignRight />} />
            </ToolbarSection>
        </ToolbarWrapper>
    );
};
