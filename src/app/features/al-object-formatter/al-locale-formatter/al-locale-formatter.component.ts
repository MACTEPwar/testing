import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'al-locale-formatter',
    templateUrl: './al-locale-formatter.component.html',
    styleUrls: ['./al-locale-formatter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LocaleFormatterComponent implements OnInit {
    @Input() value;
    display: string;

    constructor(private translateService: TranslateService) {}

    ngOnInit(): void {
        this.display = this.parseValue(this.value ?? null);
        this.translateService.onLangChange.subscribe((s) => {
            this.display = this.parseValue(this.value ?? null);
        });
    }

    parseValue(preValue: Array<any>): string {
        if (Array.isArray(preValue)){
            return preValue?.find(
                (f) => f.language === this.translateService.currentLang
            )?.name;
        } else {
            return preValue;
        }
    }

    typeRetunr() {
        return typeof this.display;
    }
}
