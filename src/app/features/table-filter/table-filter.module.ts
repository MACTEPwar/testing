import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFilterComponent } from './table-filter.component';
import { TableModule } from 'primeng/table';
import { DefaultComponent as BooleanDefaultFilter } from './filters/bool/default/default.component';
import { DefaultComponent as DateDefaultFilter } from './filters/date/default/default.component';
import { DefaultComponent as LocaleDefaultFilter } from './filters/locale/default/default.component';
import { DefaultComponent as NumberDefaultFilter } from './filters/number/default/default.component';
import { DefaultComponent as TextDefaultFilter } from './filters/text/default/default.component';
import { AlInputModule } from '../ui-components/al-input/al-input.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { appLocalizationModuleChild } from 'src/app/core/localization/localization.module';
import { TableFilterService } from './table-filter.service';

@NgModule({
  declarations: [
    TableFilterComponent,
    BooleanDefaultFilter,
    DateDefaultFilter,
    LocaleDefaultFilter,
    NumberDefaultFilter,
    TextDefaultFilter,
  ],
  imports: [
    CommonModule,
    TableModule,
    AlInputModule,
    FormsModule,
    ReactiveFormsModule,
    DropdownModule,
    appLocalizationModuleChild,
  ],
  providers: [TableFilterService],
  exports: [TableFilterComponent],
})
export class TableFilterModule {}
