import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'al-object-formatter',
    templateUrl: './al-object-formatter.component.html',
    styleUrls: ['./al-object-formatter.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ObjectFormatterComponent implements OnInit {
    @Input() col;
    @Input() value;
    @Input() flag = false;
    @Input() constants: any;

    constructor() {}

    ngOnInit(): void {
        this.value = this.value ?? '---';
    }
}
