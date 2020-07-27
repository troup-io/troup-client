import { theme as primerDefault } from '@primer/components';
import colors, { ColorsType, defaultColors } from './colors.theme';
import variables, {
    breakpoints,
    borderWidths,
    radii,
    fonts,
    fontSizes,
    fontWeights,
    sizes,
    space,
    VariablesType,
} from './variables.theme';

export interface Theme {
    brand: Record<ColorsType, string>;
    variables: Record<VariablesType, number>;
}

export const theme = {
    ...primerDefault,
    breakpoints,
    borderWidths,
    radii,
    fonts,
    fontSizes,
    fontWeights,
    sizes,
    space,
    colors,
    brand: defaultColors,
    variables,
    textInputs: {
        default: {
            borderRadius: '10px',
        },
    },
};

export type { ColorsType, VariablesType };
