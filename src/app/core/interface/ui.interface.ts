import * as UI from "@Types_/ui.types";

export interface Preference {
    template: UI.TemplateType;
    theme:    UI.ThemeType;
    color:    UI.ColorType;
    lenguge:  UI.LenguageType;
}

export interface Page {
    id:    number;
    label: string;
    path:  string;
    icon?: string;
}
  
export interface Submenu {
    id:    number;
    icon:  string;
    label: string;
    pages: Page[];
}

export interface Menu {
    id:        number;
    section:   string;
    pages?:    Page[];
    submenus?: Submenu[];
}

export interface Dropdown {
    label: string;
    value: any;
}

export interface Checkout {
    id:      number,
    value:   string,
    checked: boolean
}