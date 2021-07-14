import { IToolbarItem } from './i-toolbar-item';

export abstract class AToolbarSeparatorItem implements IToolbarItem {
    id: string;
    type: string;
    classes = [];
    styles = {};
    isVisible = false;

    constructor() {
        this.type = 'separator';
    }
}
