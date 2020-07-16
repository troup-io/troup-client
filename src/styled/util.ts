import { VariantsType, Variants } from '@styled/interfaces';
import { ColorsType } from './theme';

export const getVariantStyle = (
    variant: VariantsType
): { mainColor: ColorsType; altColor: ColorsType } => {
    let bg: ColorsType = 'primaryDark';
    let fg: ColorsType = 'white';

    switch (variant) {
        default: {
            break;
        }

        case Variants.default: {
            bg = 'darkDim';
            fg = 'darkDim';
            break;
        }

        case Variants.secondary: {
            bg = 'secondary';
            break;
        }

        case Variants.success: {
            bg = 'success';
            break;
        }

        case Variants.info: {
            bg = 'info';
            break;
        }

        case Variants.warning: {
            bg = 'warning';
            fg = 'dark';
            break;
        }

        case Variants.panic: {
            bg = 'panic';
            break;
        }

        case Variants.danger: {
            bg = 'danger';
            break;
        }
    }

    return {
        mainColor: bg,
        altColor: fg,
    };
};
