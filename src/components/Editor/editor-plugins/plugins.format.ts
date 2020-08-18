import {
    BoldPluginOptions,
    BoldPlugin,
    DEFAULTS_BOLD,
    ItalicPluginOptions,
    ItalicPlugin,
    DEFAULTS_ITALIC,
    StrikethroughPluginOptions,
    StrikethroughPlugin,
    DEFAULTS_STRIKETHROUGH,
    AlignPluginOptions,
    AlignPlugin,
    DEFAULTS_ALIGN,
} from '@udecode/slate-plugins';

import { EditorPlugin } from 'data/interfaces';

export const boldPlugin: EditorPlugin<BoldPluginOptions> = (options) =>
    BoldPlugin({
        ...DEFAULTS_BOLD,
        ...options,
    });

export const italicPlugin: EditorPlugin<ItalicPluginOptions> = (options) =>
    ItalicPlugin({
        ...DEFAULTS_ITALIC,
        ...options,
    });

export const strikethroughPlugin: EditorPlugin<StrikethroughPluginOptions> = (options) =>
    StrikethroughPlugin({
        ...DEFAULTS_STRIKETHROUGH,
        ...options,
    });

export const alignPlugin: EditorPlugin<AlignPluginOptions> = (options) =>
    AlignPlugin({
        ...DEFAULTS_ALIGN,
        ...options,
    });
