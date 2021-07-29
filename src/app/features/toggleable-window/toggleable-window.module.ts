import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ModalContainerComponent } from './modal-container/modal-container.component';
import { ToggleableWindowHolderDirective } from './toggleable-window-holder.directive';
import { ToggleableWindowService } from './toggleable-window.service';
import { SidebarContainerComponent } from './sidebar-container/sidebar-container.component';
import { AlertComponent } from './window-containers/alert/alert.component';
import { ConfirmComponent } from './window-containers/confirm/confirm.component';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { appLocalizationModuleChild } from '../../core/localization/localization.module';

@NgModule({
  imports: [
    CommonModule,
    DialogModule,
    SidebarModule,
    ButtonModule,
    appLocalizationModuleChild,
  ],
  declarations: [
    ModalContainerComponent,
    SidebarContainerComponent,
    ToggleableWindowHolderDirective,
    AlertComponent,
    ConfirmComponent,
  ],
  entryComponents: [ModalContainerComponent, SidebarContainerComponent],
  exports: [
    ModalContainerComponent,
    SidebarContainerComponent,
    ToggleableWindowHolderDirective,
  ],
  providers: [ToggleableWindowService],
})
export class ToggleableWindowModule {}
