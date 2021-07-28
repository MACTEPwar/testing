import { Component, Input, OnInit } from '@angular/core';
import { AToolbarButtonItem } from '../../models/interfaces/a-toolbar-button-item';

@Component({
    selector: 'al-toolbar-button',
    templateUrl: './toolbar-button.component.html',
    styleUrls: ['./toolbar-button.component.scss'],
})
export class ToolbarButtonComponent implements OnInit {
    private _classes: any;
    public get classes(): any {
        return this.item.classes.join(' ');
    }
    @Input() item: AToolbarButtonItem;
    @Input() title: string;
    constructor() {}

    ngOnInit(): void {
    }
}
