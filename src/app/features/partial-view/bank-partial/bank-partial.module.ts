import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { appLocalizationModuleChild } from '../../../core/localization/localization.module';
import { TableModule } from '../../table-base/table.module';
import { AlCalendarModule } from '../../ui-components/al-calendar/al-calendar.module';
import { AlInputModule } from '../../ui-components/al-input/al-input.module';
import { BankCreateComponent } from './bank-create/bank-create.component';
import { BankPartialComponent } from './bank-partial.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [BankPartialComponent, BankCreateComponent],
  imports: [
    CommonModule,
    AlInputModule,
    ButtonModule,
    AlCalendarModule,
    appLocalizationModuleChild,
    TableModule,
  ],
  exports: [BankPartialComponent],
})
export class BankPartialModule {}
