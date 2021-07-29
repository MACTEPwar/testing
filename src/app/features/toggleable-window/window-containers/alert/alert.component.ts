import { Component, OnInit, Optional } from '@angular/core';
import { AlertOptions } from './alert-options';
import { ModalContext } from '../../modal-container/modal-context';
import { SidebarContext } from '../../sidebar-container/sidebar-context';
import { EToggleableWindowType } from '../../e-toggleable-window-type';

@Component({
  selector: 'app-alert-togglable-window-container',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class AlertComponent implements OnInit {
  options: AlertOptions;

  constructor(
    @Optional() public modalContext: ModalContext<any>,
    @Optional() public sidebarContext: SidebarContext<any>
  ) {
    if (modalContext) {
      this.options = this.modalContext.data;
    }
    if (sidebarContext) {
      this.options = this.sidebarContext.data;
    }
  }

  ngOnInit(): void {}

  apply(): void {
    switch (this.options.type) {
      case EToggleableWindowType.MODAL: {
        this.modalContext.resolve()
        break;
      }
      case EToggleableWindowType.SIDEBAR: {
        this.sidebarContext.resolve()
        break;
      }
    }
  }
}
