import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableFilterComponent } from './table-filter.component';
import { TableModule } from 'primeng/table';
import { DefaultComponent as BooleanDefaultFilter } from './filters/bool/default/default.component';
import { DefaultComponent as DateDefaultFilter } from './filters/date/default/default.component';
import { DefaultComponent as LocaleDefaultFilter } from './filters/locale/default/default.component';
import { DefaultComponent as NumberDefaultFilter } from './filters/number/default/default.component';
import { DefaultComponent as TextDefaultFilter } from './filters/text/default/default.component';

@NgModule({
  declarations: [
    TableFilterComponent,
    BooleanDefaultFilter,
    DateDefaultFilter,
    LocaleDefaultFilter,
    NumberDefaultFilter,
    TextDefaultFilter,
  ],
  imports: [CommonModule, TableModule],
  exports: [TableFilterComponent]
})
export class TableFilterModule {}
