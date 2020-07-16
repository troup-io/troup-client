import styled, { css } from 'styled-components';
import { Flash, FlashProps } from '@primer/components';

import { ColorsType } from '@styled/theme';
import { scale } from '@styled/media';
import { color, lighten } from '@styled/helper';

type AlertProps = Omit<FlashProps, 'variant'>;

const commons = (colorType: ColorsType): any => css<AlertProps>`
    color: ${color(colorType)};
    background: ${lighten(colorType, 0.3)};
    border: 0px;

    ${scale('font-size')`0.95rem 0.9rem`};
    ${scale('line-height')`1.5rem 1.4rem 1.3rem`};
`;

export const AlertSuccess = styled(Flash)<AlertProps>`
    ${commons('success')}
`;

export const AlertInfo = styled(Flash)<AlertProps>`
    ${commons('info')}
`;

export const AlertWarning = styled(Flash)<AlertProps>`
    ${commons('warning')}
`;

export const AlertPanic = styled(Flash)<AlertProps>`
    ${commons('panic')}
`;

export const AlertDanger = styled(Flash)<AlertProps>`
    ${commons('danger')}
`;
