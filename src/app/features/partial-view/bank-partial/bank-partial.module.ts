import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DataGridModule } from '../../ui-components/data-grid/data-grid.module';
import { BankPartialComponent } from './bank-partial.component';

@NgModule({
  declarations: [BankPartialComponent],
  imports: [CommonModule, DataGridModule, FormsModule],
  exports: [BankPartialComponent],
})
export class BankPartialModule {}
