import { withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import {
    withTable,
    withLink,
    withDeserializeHTML,
    withImageUpload,
    withToggleType,
    withAutoformat,
    withTransforms,
    withTrailingNode,
    withInlineVoid,
    SlatePlugin,
} from '@udecode/slate-plugins';

import { autoformatRules } from '../autoFormat';
import { EditorOptions } from '../editor-options';

import * as blockPlugins from './plugins.block';
import * as breakPlugins from './plugins.break';
import * as formatPlugins from './plugins.format';
import * as inlinePlugins from './plugins.inline';
import { EditorPlugin } from 'data/interfaces';

export const EditorPlugins: SlatePlugin[] = ((plugins: EditorPlugin<any>): SlatePlugin[] =>
    Object.values(plugins).map((plugin) => plugin()) as SlatePlugin[])({
    ...inlinePlugins,
    ...blockPlugins,
    ...formatPlugins,
    ...breakPlugins,
} as any);

console.log('plugins', EditorPlugins);

export const withPlugins = [
    withReact,
    withHistory,
    withTable(EditorOptions),
    withLink(),
    withDeserializeHTML({ plugins: EditorPlugins }),
    withImageUpload(),
    withToggleType({ defaultType: EditorOptions.p.type }),
    withAutoformat({ rules: autoformatRules }),
    withTransforms(),
    withTrailingNode({ type: EditorOptions.p.type, level: 1 }),
    withInlineVoid({ plugins: EditorPlugins }),
] as const;
