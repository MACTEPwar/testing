import { Component, OnInit } from '@angular/core';
import { ModalContext } from '../../../modal/modal-context';
import { AlertOptions } from './alert-options';

@Component({
    selector: 'al-alert-window',
    templateUrl: './alert-window.component.html',
    styleUrls: ['./alert-window.component.scss'],
})
export class AlertWindowComponent implements OnInit {

    options: AlertOptions;

    constructor(public modalContext: ModalContext<any>) {
        this.options = this.modalContext.data;
    }

    ngOnInit(): void {}
}
