import { Theme, ColorsType, VariablesType } from './theme';

interface Props {
    theme: Theme;
}

export const color = (key: ColorsType): Function => (props: Props): string =>
    props.theme.colors[key];

export const variable = (key: VariablesType): Function => (props: Props): string | number =>
    props.theme.variables[key];
