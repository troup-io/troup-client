export enum Variants {
    primary = 'primary',
    secondary = 'secondary',
    default = 'default',
    success = 'success',
    info = 'info',
    warning = 'warning',
    panic = 'panic',
    danger = 'danger',
    dark = 'dark',
}

export type VariantsType = keyof typeof Variants;
