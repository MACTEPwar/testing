import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankPartialComponent } from './bank-partial.component';
import { DataGridModule } from '../../ui-components/data-grid/data-grid.module';

@NgModule({
  declarations: [BankPartialComponent],
  imports: [CommonModule, DataGridModule],
  exports: [BankPartialComponent],
})
export class BankPartialModule {}
