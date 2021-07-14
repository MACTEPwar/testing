import { IToolbarActionItem } from './i-toolbar-action-item';

export abstract class AToolbarButtonItem implements IToolbarActionItem {
    id: string;
    title: string;
    icon: string;
    typeIcon: 'path' | 'prime' | 'fontawesome';
    call: Function;
    type: string;
    classes = [];
    styles = {};
    disabled = false;
    isVisible = false;

    constructor() {
        this.type = 'button';
    }
}
