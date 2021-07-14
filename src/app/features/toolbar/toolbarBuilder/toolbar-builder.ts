import {IButtonOptions, ICalendarOptions, IOpenLinkedDataOptions, ISeparatorOptions,} from '../i-toolbar.service';
import {ToolbarButtonItem} from '../models/concrete/toolbar-button-item-options';
import {ToolbarOpenLinkedDataItem} from '../models/concrete/toolbar-open-linked-date-item-options';
import {ToolbarCalendarItem} from '../models/concrete/toolbar-calendar-item-options';
import {ToolbarSeparatorItem} from '../models/concrete/toolbar-separator-item-options';
import {ToolbarService} from '../service/toolbar.service';

export class ToolbarBuilder {
    // private collections: any[] = [];

    constructor(public toolbarService: ToolbarService) {}

    public addButton(buttonOptions: IButtonOptions): this {
        this.toolbarService.addItem(
            new ToolbarButtonItem(
                buttonOptions?.id,
                buttonOptions?.title,
                buttonOptions?.icon,
                buttonOptions?.call,
                buttonOptions?.disabled,
                buttonOptions?.typeIcon,
                buttonOptions?.isVisible,
                buttonOptions?.classes || [],
                buttonOptions?.styles || {}
            )
        );
        return this;
    }

    public addSeparator(separatorOptions?: ISeparatorOptions): this {
        this.toolbarService.addItem(
            new ToolbarSeparatorItem(
                separatorOptions.id,
                separatorOptions?.isVisible,
                separatorOptions?.classes || [],
                separatorOptions?.styles || {}
            )
        );
        return this;
    }

    public addCalendar(calendarOptions?: ICalendarOptions): this {
        this.toolbarService.addItem(
            new ToolbarCalendarItem(
                calendarOptions.id,
                calendarOptions?.selectionMode || 'range',
                calendarOptions?.func,
                calendarOptions?.isVisible,
                calendarOptions?.classes || [],
                calendarOptions?.styles || {},
                calendarOptions?.view || 'date',
                calendarOptions?.dateFormate || 'dd.mm.yy'
            )
        );
        return this;
    }

    public addOpenLinkedData(
        openLinkedDataOptions?: IOpenLinkedDataOptions
    ): this {
        this.toolbarService.addItem(
            new ToolbarOpenLinkedDataItem(
                openLinkedDataOptions.id,
                openLinkedDataOptions.label,
                openLinkedDataOptions.component,
                openLinkedDataOptions.value,
                openLinkedDataOptions.display,
                openLinkedDataOptions.call,
                openLinkedDataOptions?.isVisible,
                openLinkedDataOptions?.classes || [],
                openLinkedDataOptions?.styles || {},
                openLinkedDataOptions?.linkedOptions
        // {
        // filters: new FilterItem('status', '1', 'eq', EFilterType.INTEGER)
        // }
            )
        );
        return this;
    }

    public build(): any[] {
        return this.toolbarService.items.getValue();
    }
}
