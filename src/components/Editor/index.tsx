import React, { useMemo, useState } from 'react';
import { createEditor, Node } from 'slate';
import { Slate, ReactEditor } from 'slate-react';
import { EditablePlugins, pipe, SlateDocument } from '@udecode/slate-plugins';
import { Box } from '@primer/components';
import styled from 'styled-components';

import { EditorPlugins, withPlugins } from './editor-plugins';

import { Toolbar } from './Toolbar';

import { color, padding, borderRadius, darken } from 'styled/helper';

const EditorWrapper = styled(Box)`
    display: grid;
    grid-template-rows: max-content auto;
    row-gap: 10px;
    width: 100%;
    height: max-content;
    min-height: 10000px;
    background: ${color('darker')};
    ${padding(1)};
    ${borderRadius(1)};

    .slate-code-block {
        background: ${darken('darker', 0.1)};
    }

    > [data-slate-editor] {
        ${padding(0, 1, 1)};
    }
`;

const initialValue: Node[] = [
    {
        type: 'paragraph',
        children: [
            {
                text: 'lol',
            },
        ],
    },
];

const createReactEditor = (): React.FC => () => {
    const [value, setValue] = useState(initialValue);
    const editor = useMemo(() => pipe(createEditor(), ...withPlugins), []) as ReactEditor;

    return (
        <EditorWrapper>
            <Slate
                editor={editor}
                value={value}
                onChange={(newValue) => setValue(newValue as SlateDocument)}
            >
                <Toolbar />
                <EditablePlugins plugins={EditorPlugins} placeholder="Enter some text..." />
            </Slate>
        </EditorWrapper>
    );
};

export const Editor = createReactEditor();
