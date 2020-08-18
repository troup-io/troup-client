import { Editor } from 'slate';
import {
    AutoformatRule,
    MARK_BOLD,
    MARK_CODE,
    MARK_ITALIC,
    MARK_STRIKETHROUGH,
    toggleList,
    unwrapList,
} from '@udecode/slate-plugins';

import { EditorOptions } from './editor-options';

const preFormat = (editor: Editor) => unwrapList(editor, EditorOptions);

export const autoformatRules: AutoformatRule[] = [
    {
        type: EditorOptions.h1.type,
        markup: '#',
        preFormat,
    },
    {
        type: EditorOptions.h2.type,
        markup: '##',
        preFormat,
    },
    {
        type: EditorOptions.h3.type,
        markup: '###',
        preFormat,
    },
    {
        type: EditorOptions.h4.type,
        markup: '####',
        preFormat,
    },
    {
        type: EditorOptions.h5.type,
        markup: '#####',
        preFormat,
    },
    {
        type: EditorOptions.h6.type,
        markup: '######',
        preFormat,
    },
    {
        type: EditorOptions.li.type,
        markup: ['*', '-', '+'],
        preFormat,
        format: (editor) => {
            toggleList(editor, { ...EditorOptions, typeList: EditorOptions.ul.type });
        },
    },
    {
        type: EditorOptions.li.type,
        markup: ['1.', '1)'],
        preFormat,
        format: (editor) => {
            toggleList(editor, { ...EditorOptions, typeList: EditorOptions.ol.type });
        },
    },
    {
        type: EditorOptions.blockquote.type,
        markup: ['>'],
        preFormat,
    },
    {
        type: MARK_BOLD,
        between: ['**', '**'],
        mode: 'inline',
        insertTrigger: true,
    },
    {
        type: MARK_BOLD,
        between: ['__', '__'],
        mode: 'inline',
        insertTrigger: true,
    },
    {
        type: MARK_ITALIC,
        between: ['*', '*'],
        mode: 'inline',
        insertTrigger: true,
    },
    {
        type: MARK_ITALIC,
        between: ['_', '_'],
        mode: 'inline',
        insertTrigger: true,
    },
    {
        type: MARK_CODE,
        between: ['`', '`'],
        mode: 'inline',
        insertTrigger: true,
    },
    {
        type: MARK_STRIKETHROUGH,
        between: ['~~', '~~'],
        mode: 'inline',
        insertTrigger: true,
    },
    {
        trigger: '`',
        type: EditorOptions.code_block.type,
        markup: '``',
        mode: 'inline-block',
        preFormat: (editor) => unwrapList(editor, EditorOptions),
    },
];
