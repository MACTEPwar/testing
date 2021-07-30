import { Injectable, Type } from '@angular/core';
import { from, Observable } from 'rxjs';

import { ModalService } from '../modal/modal.service';
import { EWindowType } from './e-window-type';
import { IOptionsWindow } from './i-options-window';
import { AlertWindowComponent } from './windows/alert-window/alert-window.component';
import { ConfirmWindowComponent } from './windows/confirm-window/confirm-window.component';

@Injectable()
export class WindowService {
    constructor(private modalService: ModalService) {}

    openWindow(windowType: EWindowType, options: IOptionsWindow): Observable<any> {
        return from(
            this.modalService.open(
                this.getContainerByWindowType(windowType),
                options
            )
        );
    }

    private getContainerByWindowType(windowType: EWindowType): Type<any> {
        switch (windowType) {
            case EWindowType.ALERT:
                return AlertWindowComponent;
            case EWindowType.CONFIRM:
                return ConfirmWindowComponent;
        }
    }
}
