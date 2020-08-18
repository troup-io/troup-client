import { Location } from 'history';
import { SlatePlugin } from '@udecode/slate-plugins';

export type StatefulLocation = Location<{
    from?: string;
}>;

export type EditorPlugin<PluginOptions> = (options?: PluginOptions) => SlatePlugin;
