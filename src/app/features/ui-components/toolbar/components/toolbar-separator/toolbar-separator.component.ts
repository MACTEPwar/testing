import { Component, Input, OnInit } from '@angular/core';
import { AToolbarSeparatorItem } from '../../models/interfaces/a-toolbar-separator-item';

@Component({
    selector: 'al-toolbar-separator',
    templateUrl: './toolbar-separator.component.html',
    styleUrls: ['./toolbar-separator.component.scss'],
})
export class ToolbarSeparatorComponent implements OnInit {
    private _classes: any;
    public get classes(): any {
        return this.item.classes.join(' ');
    }
    @Input() item: AToolbarSeparatorItem;

    constructor() {}

    ngOnInit(): void {}
}
