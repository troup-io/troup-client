import {
    SoftBreakPlugin,
    ExitBreakPlugin,
    ELEMENT_H1,
    ELEMENT_H2,
    ELEMENT_H3,
    SoftBreakPluginOptions,
    ExitBreakPluginOptions,
} from '@udecode/slate-plugins';
import * as isHotkey from 'is-hotkey';

import { EditorPlugin } from 'data/interfaces';

import { EditorOptions } from '../editor-options';

(window as any).isHotkey = isHotkey;

export const softBreak: EditorPlugin<SoftBreakPluginOptions> = (options) =>
    SoftBreakPlugin({
        rules: [
            { hotkey: 'shift+enter' },
            {
                hotkey: 'enter',
                query: {
                    allow: [
                        EditorOptions.code_block.type,
                        EditorOptions.blockquote.type,
                        EditorOptions.td.type,
                    ],
                },
            },
        ],
    });

export const exitBreak: EditorPlugin<ExitBreakPluginOptions> = (options) =>
    ExitBreakPlugin({
        rules: [
            {
                hotkey: 'mod+enter',
            },
            {
                hotkey: 'mod+shift+enter',
                before: true,
                defaultType: EditorOptions.p.type,
            },
            {
                hotkey: 'enter',
                query: {
                    start: true,
                    end: true,
                    allow: [ELEMENT_H1, ELEMENT_H2, ELEMENT_H3],
                },
                defaultType: EditorOptions.p.type,
            },
        ],
    });
