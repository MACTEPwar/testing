import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WindowService } from './window.service';
import { AlertWindowComponent } from './windows/alert-window/alert-window.component';
import { ConfirmWindowComponent } from './windows/confirm-window/confirm-window.component';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { appLocalizationModuleChild } from '../../core/localization/localization.module';

@NgModule({
    declarations: [AlertWindowComponent, ConfirmWindowComponent],
    imports: [
        CommonModule,
        DialogModule,
        ButtonModule,
        appLocalizationModuleChild,
    ],
    providers: [WindowService],
})
export class WindowModule {}
