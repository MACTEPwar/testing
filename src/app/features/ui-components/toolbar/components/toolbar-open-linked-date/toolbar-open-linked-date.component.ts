import { Component, Input, OnInit } from '@angular/core';
// import { SidebarContext } from '@features/sidebar/sidebar-context';
import { AToolbarOpenLinkedDataItem } from '../../models/interfaces/a-toolbar-open-linked-date-item';

@Component({
    selector: 'al-toolbar-open-linked-date',
    templateUrl: './toolbar-open-linked-date.component.html',
    providers: [
        // SidebarContext
    ],
})
export class ToolbarOpenLinkedDataComponent implements OnInit {
    @Input() item: AToolbarOpenLinkedDataItem;

    constructor() {}

    ngOnInit(): void {}
}
