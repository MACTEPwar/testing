import { AToolbarCalendarItem } from '../interfaces/a-toolbar-calendar-item';

export class ToolbarCalendarItem extends AToolbarCalendarItem {
    constructor(
        id: string,
        selectionMode: 'multiple' | 'single' | 'range',
        call: Function,
        isVisible = false,
        classes?: string[],
        styles?: {},
        view?: 'date' | 'month',
        dateFormat?: string
    ) {
        super();
        this.id = id;
        this.selectionMode = selectionMode;
        this.dateRange = call;
        this.classes = classes;
        this.styles = styles;
        this.isVisible = isVisible;
        this.view = view;
        this.dateFormat = dateFormat;
    }
}
