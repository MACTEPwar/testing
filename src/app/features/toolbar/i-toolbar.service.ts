export interface ISeparatorOptions {
    id: string;
    classes?: string[];
    styles?: object;
    isVisible?: boolean;
}

export interface ICalendarOptions {
    id: string;
    selectionMode?: 'multiple' | 'single' | 'range';
    func?: (fromDate?: Date, toDate?: Date) => void;
    classes?: string[];
    styles?: object;
    isVisible?: boolean;
    view?: 'date' | 'month';
    dateFormate?: string;
}

export interface IButtonOptions {
    id: string;
    call: Function;
    title?: string;
    icon?: string;
    disabled?: boolean;
    typeIcon?: 'path' | 'prime' | 'fontawesome';
    classes?: string[];
    styles?: object;
    isVisible?: boolean;
}

export interface IOpenLinkedDataOptions {
    id: string;
    value: any;
    display: any;
    call: Function;
    component: any;
    label: string;
    classes?: string[];
    styles?: object;
    isVisible?: boolean;
    linkedOptions?: any;
}
