import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
    name: 'stringFormatter',
})
export class StringFormatterPipe implements PipeTransform {
    constructor(private translateService: TranslateService) {}

    transform(value: any, currentLocale?: string): unknown {
        if (!currentLocale) {
            currentLocale = this.translateService.currentLang;
        }
        try {
            const TEMP: any = JSON.parse(value);
            if (Array.isArray(TEMP)) {
                value = TEMP.map((m) => ({
                    language: m.Language,
                    name: m.Name,
                }));
            }
        } catch {}

        if (!value) {
            return ' ----- ';
        } else if (Array.isArray(value)) {
            return value?.find((f) => f.language === currentLocale)?.name;
        } else if (
            value
                ?.toString()
                .search(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{6})?/g) !== -1
        ) {
            return new Date(value).toLocaleString();
        } else {
            return value;
        }
    }
}
