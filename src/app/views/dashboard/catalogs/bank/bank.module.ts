import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankRoutingModule } from './bank-routing.module';
import { BankComponent } from './bank/bank.component';
import { BankPartialModule } from '../../../../features/partial-view/bank-partial/bank-partial.module';

@NgModule({
  declarations: [BankComponent],
  imports: [CommonModule, BankRoutingModule, BankPartialModule],
})
export class BankModule {}
