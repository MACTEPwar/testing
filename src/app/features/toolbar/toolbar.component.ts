import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { IToolbarItem } from './models/interfaces/i-toolbar-item';
import { IToolbarService } from './service/i-toolbar.service';
import { ToolbarService } from './service/toolbar.service';
import { Type } from '@angular/core';
import { ToolbarButtonItem } from './models/concrete/toolbar-button-item-options';

@Component({
    selector: 'al-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss'],
    providers: [
        { provide: 'IToolbarService', useClass: ToolbarService }
    ]
})
export class ToolbarComponent implements OnInit {

    /// [{ title = '34', icon = 'fas times', onClick = () => void }]
    // @Input() items: Array<IToolbarItem> = new Array<IToolbarItem>();
    @Input() items: Array<any> = new Array<any>();
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onSetToolbarService: EventEmitter<IToolbarService> = new EventEmitter<IToolbarService>();

    ToolbarButtonItem: Type<any> = ToolbarButtonItem;

    constructor(
        @Inject('IToolbarService') private toolbarService: IToolbarService
    ) { }

    ngOnInit(): void {
        this.onSetToolbarService.emit(this.toolbarService);
        this.toolbarService.items.next(this.items);
    }

    getToolbarService(): IToolbarService{
        return this.toolbarService;
    }

}
