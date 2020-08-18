import {
    ParagraphPluginOptions,
    ParagraphPlugin,
    DEFAULTS_PARAGRAPH,
    BlockquotePluginOptions,
    BlockquotePlugin,
    DEFAULTS_BLOCKQUOTE,
    CodeBlockPluginOptions,
    CodeBlockPlugin,
    DEFAULTS_CODE_BLOCK,
    HeadingPluginOptions,
    HeadingPlugin,
    DEFAULTS_HEADING,
    MediaEmbedPluginOptions,
    MediaEmbedPlugin,
    DEFAULTS_MEDIA_EMBED,
    ImagePluginOptions,
    ImagePlugin,
    DEFAULTS_IMAGE,
    ListPluginOptions,
    ListPlugin,
    DEFAULTS_LIST,
    TablePluginOptions,
    TablePlugin,
    DEFAULTS_TABLE,
    ResetBlockTypePluginOptions,
    ResetBlockTypePlugin,
} from '@udecode/slate-plugins';

import { EditorPlugin } from 'data/interfaces';

import { optionsResetBlockTypes } from '../editor-options';

console.log('defaultParagraph', DEFAULTS_HEADING);

export const paragraphPlugin: EditorPlugin<ParagraphPluginOptions> = (options) =>
    ParagraphPlugin({
        ...DEFAULTS_PARAGRAPH,
        ...options,
        ...{
            p: {
                type: 'paragraph',
            },
        },
    });

export const blockquotePlugin: EditorPlugin<BlockquotePluginOptions> = (options) =>
    BlockquotePlugin({
        ...DEFAULTS_BLOCKQUOTE,
        ...options,
    });

export const codeBlockPlugin: EditorPlugin<CodeBlockPluginOptions> = (options) =>
    CodeBlockPlugin({
        ...DEFAULTS_CODE_BLOCK,
        ...options,
    });

export const headingPlugin: EditorPlugin<HeadingPluginOptions> = (options) =>
    HeadingPlugin({
        ...DEFAULTS_HEADING,
        ...options,
    });

export const mediaEmbedPlugin: EditorPlugin<MediaEmbedPluginOptions> = (options) =>
    MediaEmbedPlugin({
        ...DEFAULTS_MEDIA_EMBED,
        ...options,
    });

export const imagePlugin: EditorPlugin<ImagePluginOptions> = (options) =>
    ImagePlugin({
        ...DEFAULTS_IMAGE,
        ...options,
    });

export const listPlugin: EditorPlugin<ListPluginOptions> = (options) =>
    ListPlugin({
        ...DEFAULTS_LIST,
        ...options,
    });

export const tablePlugin: EditorPlugin<TablePluginOptions> = (options) =>
    TablePlugin({
        ...DEFAULTS_TABLE,
        ...options,
    });

export const resetBlockTypesPlugin: EditorPlugin<ResetBlockTypePluginOptions> = (options) =>
    ResetBlockTypePlugin({
        ...optionsResetBlockTypes,
        ...options,
    });
