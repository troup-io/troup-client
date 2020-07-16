import { css, FlattenSimpleInterpolation } from 'styled-components';

import variables from './theme/variables.theme';

export const breakpoint = (size: keyof typeof variables['breakPoints']) => {
    return function breakpointCSSGenerator(breakpointStyles: string): string {
        return `
                ${variables.breakPoints[size]} {
                    ${breakpointStyles}
                }
            `;
    };
};

export const scale = (
    property: string
): ((valueString: TemplateStringsArray) => FlattenSimpleInterpolation) => {
    const getIndexValue = (values: Array<string>, index: number): string => {
        if (values[index]) {
            return values[index];
        }

        index--;
        return getIndexValue(values, index);
    };

    return function _computedScaleValues(
        valueString: TemplateStringsArray
    ): FlattenSimpleInterpolation {
        const values: Array<string> = valueString[0]
            .replace(/(\r|\n){1,}/g, '')
            .replace(/\s{1,}/g, ',')
            .split(',')
            .filter((o) => o);

        const generatedStyles = Object.values(variables.breakPoints)
            .map(
                (breakPoint, index) => `
            ${breakPoint} {
                ${property}: ${getIndexValue(values, index)}
            }
        `
            )
            .join('\n\n');

        return css`
            ${generatedStyles};
        `;
    };
};
