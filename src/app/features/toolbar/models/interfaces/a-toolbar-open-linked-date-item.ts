import { IToolbarActionItem } from './i-toolbar-action-item';

export abstract class AToolbarOpenLinkedDataItem implements IToolbarActionItem {
    id: string;
    type: string;
    disabled: boolean;
    value: any;
    display: any;
    call: Function;
    classes?: any[];
    styles?: any;
    component: any;
    lebal: string;
    isVisible = false;
    linkedOptions?: any = {};

    constructor() {
        this.type = 'openLinkedData';
    }
}
