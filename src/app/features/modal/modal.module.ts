import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModalContainerComponent } from './modal-container/modal-container.component';
import { ModalHolderDirective } from './modal-holder.directive';
import { ModalService } from './modal.service';

@NgModule({
  imports: [
    CommonModule,
    // BrowserAnimationsModule
  ],
  declarations: [ModalContainerComponent, ModalHolderDirective],
  entryComponents: [ModalContainerComponent],
  exports: [ModalContainerComponent, ModalHolderDirective],
  providers: [ModalService]
})
export class ModalModule { }