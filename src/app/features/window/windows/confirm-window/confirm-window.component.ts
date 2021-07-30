import { Component, OnInit } from '@angular/core';
import { ConfirmOptions } from './confirm-options';
import { EButton } from './e-button';
import { ModalContext } from '../../../modal/modal-context';

@Component({
    selector: 'al-confirm-window',
    templateUrl: './confirm-window.component.html',
    styleUrls: ['./confirm-window.component.scss'],
})
export class ConfirmWindowComponent implements OnInit {
    options: ConfirmOptions;

    eButtonType = EButton;

    constructor(public modalContext: ModalContext<any>) {
        this.options = this.modalContext.data;
    }

    ngOnInit(): void {}
}
