import { Component, OnInit, Optional } from '@angular/core';
import { ModalContext } from '../../modal-container/modal-context';
import { SidebarContext } from '../../sidebar-container/sidebar-context';
import { ConfirmOptions } from './confirm-options';
import { EToggleableWindowType } from '../../e-toggleable-window-type';

@Component({
  selector: 'app-confirm-togglable-window-container',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.scss'],
})
export class ConfirmComponent implements OnInit {
  options: ConfirmOptions;

  constructor(
    @Optional() public modalContext: ModalContext<any>,
    @Optional() public sidebarContext: SidebarContext<any>
  ) {
    switch (this.options.type) {
      case EToggleableWindowType.MODAL: {
        this.options = this.modalContext.data;
        break;
      }
      case EToggleableWindowType.SIDEBAR: {
        this.options = this.sidebarContext.data;
        break;
      }
    }
  }

  ngOnInit(): void {}

  click(type): void {
    switch (this.options.type) {
      case EToggleableWindowType.MODAL: {
        this.modalContext.resolve(type)
        break;
      }
      case EToggleableWindowType.SIDEBAR: {
        this.sidebarContext.resolve(type)
        break;
      }
    }
  }
}
