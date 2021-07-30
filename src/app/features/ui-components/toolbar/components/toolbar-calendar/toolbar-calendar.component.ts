import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { getDatePickerSettingsByLocale } from '../../../../../core/localization/date-picker-locales';
import { AToolbarCalendarItem } from '../../models/interfaces/a-toolbar-calendar-item';

@Component({
    selector: 'al-toolbar-calendar',
    templateUrl: './toolbar-calendar.component.html',
})
export class ToolbarCalendarComponent implements OnInit {
    public dateRange: Date = null;
    private _classes: any;
    public get classes(): any {
        return this.item.classes.join(' ');
    }
    @Input() item: AToolbarCalendarItem;

    constructor(private translateService: TranslateService) {}

    ngOnInit(): void {}

    /**
     * Получает текущий год
     */
    public getCurrentYear = (): number => new Date().getFullYear();

    /**
     * Получает настройки для датапикера с текущей локалью
     */
    public loadDatePickerSettingWithLocale(): any {
        return getDatePickerSettingsByLocale(this.translateService.currentLang);
    }

    public filterDateRange(): void {
        try {
            // TODO: Временное решение для фикса null в dateRange при первом выборе даты
            setTimeout(() => {
                this.item.dateRange(this.dateRange);
            });
        } catch {
            this.item.dateRange();
        }
    }
}
