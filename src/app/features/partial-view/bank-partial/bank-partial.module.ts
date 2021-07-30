import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataGridModule } from '../../ui-components/data-grid/data-grid.module';
import { BankPartialComponent } from './bank-partial.component';
import { DialogModule } from 'primeng/dialog';
import { TitleByControlNameModule } from '../../pipes/title-by-control-name/title-by-control-name.module';
import { GetDisplayFieldByTypeModule } from '../../pipes/get-display-field-by-type/get-display-field-by-type.module';
import { appLocalizationModuleChild } from '../../../core/localization/localization.module';
import { GetKeyModule } from '../../pipes/get-key/get-key.module';
import { SharedModule } from '../../../shared/shared.module';
import { AlInputModule } from '../../ui-components/al-input/al-input.module';
import { ButtonModule } from 'primeng/button';
import { AlCalendarModule } from '../../ui-components/al-calendar/al-calendar.module';
import { BankCreateComponent } from './bank-create/bank-create.component';

@NgModule({
  declarations: [BankPartialComponent, BankCreateComponent],
  imports: [
    CommonModule,
    DataGridModule,
    FormsModule,
    DialogModule,
    TitleByControlNameModule,
    GetDisplayFieldByTypeModule,
    appLocalizationModuleChild,
    GetKeyModule,
    SharedModule,
    AlInputModule,
    ButtonModule,
    AlCalendarModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [BankPartialComponent],
})
export class BankPartialModule {}
