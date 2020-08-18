import {
    CodePluginOptions,
    CodePlugin,
    DEFAULTS_CODE,
    LinkPlugin,
    LinkPluginOptions,
    DEFAULTS_LINK,
    MentionPluginOptions,
    MentionPlugin,
    DEFAULTS_MENTION,
} from '@udecode/slate-plugins';

import { EditorPlugin } from 'data/interfaces';

export const codePlugin: EditorPlugin<CodePluginOptions> = (options) =>
    CodePlugin({
        ...DEFAULTS_CODE,
        ...options,
    });

export const linkPlugin: EditorPlugin<LinkPluginOptions> = (options) =>
    LinkPlugin({
        ...DEFAULTS_LINK,
        ...options,
    });

export const mentionPlugin: EditorPlugin<MentionPluginOptions> = (options) =>
    MentionPlugin({
        ...DEFAULTS_MENTION,
        ...options,
    });
