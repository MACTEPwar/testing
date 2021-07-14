import { IToolbarActionItem } from './i-toolbar-action-item';

export abstract class AToolbarCalendarItem implements IToolbarActionItem {
    id: string;
    selectionMode: 'single' | 'multiple' | 'range';
    title: string;
    icon: string;
    typeIcon: 'path' | 'prime' | 'fontawesome';
    call: () => void;
    dateRange: Function;
    type: string;
    classes = [];
    styles = {};
    disabled = false;
    isVisible = false;
    dateFormat: string;
    view: 'date' | 'month';

    constructor() {
        this.type = 'calendar';
    }
}
