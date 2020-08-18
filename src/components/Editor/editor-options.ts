import {
    DEFAULTS_PARAGRAPH,
    DEFAULTS_MENTION,
    DEFAULTS_BLOCKQUOTE,
    DEFAULTS_CODE_BLOCK,
    DEFAULTS_LINK,
    DEFAULTS_IMAGE,
    DEFAULTS_MEDIA_EMBED,
    DEFAULTS_TODO_LIST,
    DEFAULTS_TABLE,
    DEFAULTS_LIST,
    DEFAULTS_HEADING,
    DEFAULTS_ALIGN,
    DEFAULTS_BOLD,
    DEFAULTS_ITALIC,
    DEFAULTS_UNDERLINE,
    DEFAULTS_STRIKETHROUGH,
    DEFAULTS_CODE,
    DEFAULTS_SUBSUPSCRIPT,
    DEFAULTS_HIGHLIGHT,
    DEFAULTS_SEARCH_HIGHLIGHT,
    isBlockAboveEmpty,
    isSelectionAtBlockStart,
} from '@udecode/slate-plugins';

export const EditorOptions = {
    ...{
        p: {
            ...DEFAULTS_PARAGRAPH.p,
            type: 'paragraph',
        },
    },
    // ...DEFAULTS_PARAGRAPH,
    ...DEFAULTS_MENTION,
    ...DEFAULTS_BLOCKQUOTE,
    ...DEFAULTS_CODE_BLOCK,
    ...DEFAULTS_LINK,
    ...DEFAULTS_IMAGE,
    ...DEFAULTS_MEDIA_EMBED,
    ...DEFAULTS_TODO_LIST,
    ...DEFAULTS_TABLE,
    ...DEFAULTS_LIST,
    ...DEFAULTS_HEADING,
    ...DEFAULTS_ALIGN,
    // marks
    ...DEFAULTS_BOLD,
    ...DEFAULTS_ITALIC,
    ...DEFAULTS_UNDERLINE,
    ...DEFAULTS_STRIKETHROUGH,
    ...DEFAULTS_CODE,
    ...DEFAULTS_SUBSUPSCRIPT,
    ...DEFAULTS_HIGHLIGHT,
    ...DEFAULTS_SEARCH_HIGHLIGHT,
};

export const inlineTypes = [EditorOptions.mention.type, EditorOptions.link.type];

const resetBlockTypesCommonRule = {
    types: [
        EditorOptions.blockquote.type,
        EditorOptions.code_block.type,
        EditorOptions.todo_li.type,
    ],
    defaultType: 'paragraph',
};

export const optionsResetBlockTypes = {
    rules: [
        {
            ...resetBlockTypesCommonRule,
            hotkey: 'Enter',
            predicate: isBlockAboveEmpty,
        },
        {
            ...resetBlockTypesCommonRule,
            hotkey: 'Backspace',
            predicate: isSelectionAtBlockStart,
        },
    ],
};
