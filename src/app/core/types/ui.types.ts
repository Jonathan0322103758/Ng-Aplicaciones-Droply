/* A - Z */

class UI {

/* B */
    static readonly buttonType = ['icon', 'label', 'label-icon'] as const;
    static readonly buttonColorType = [
        'primary', 'secondary', 'success', 'danger','orange', 'warning', 'info', 'light', 'dark',
        'primary-light', 'secondary-light', 'success-light', 'danger-light', 'warning-light', 'info-light', 'light-light', 'dark-light',
        'primary-ghost', 'secondary-ghost', 'success-ghost', 'danger-ghost', 'warning-ghost', 'info-ghost', 'light-ghost', 'dark-ghost'
    ] as const;
/* C */
    static readonly shapeType = ['square', 'rounded', 'custom', 'default'] as const;
    static readonly colorType = ['primary', 'secondary', 'success', 'danger', 'warning', 'orange', 'info', 'light', 'dark'] as const;
/* L */
    static readonly lenguageType = ['ES'] as const;
/* S */
    static readonly stateType = ['open', 'closed'] as const;
/* T */
    static readonly templateType = ['classic'] as const;
    static readonly themeType = ['normal', 'light', 'dark', 'alternative', 'custom'] as const;
}
/* A */
/* B */
export type ButtonType = (typeof UI.buttonType)[number];
export type ButtonStyle =`${typeof UI.shapeType[number]}` | `${typeof UI.buttonColorType[number]}`| `${typeof UI.shapeType[number]} ${typeof UI.buttonColorType[number]}`;
/* C */
export type ClassType =`${typeof UI.shapeType[number]}` | `${typeof UI.buttonColorType[number]}`| `${typeof UI.shapeType[number]} ${typeof UI.buttonColorType[number]}`;
export type ColorType = (typeof UI.colorType)[number];
/* L */
export type LenguageType = (typeof UI.lenguageType)[number];
/* S */
export type ShapeType = (typeof UI.shapeType)[number];
export type StatusType = (typeof UI.stateType)[number];
/* T */
export type TemplateType = (typeof UI.templateType)[number];
export type ThemeType = (typeof UI.themeType)[number];