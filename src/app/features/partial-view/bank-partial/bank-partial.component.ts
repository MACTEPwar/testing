import { Component, Injector, OnInit } from '@angular/core';
import { CatalogTablePartialBase } from '../../table-base/catalog/a-catalog-table-partial-base.directive';
import { BankHttpService } from './bank-http.service';
import { BankService } from './bank.service';
import { BankCreateComponent } from './bank-create/bank-create.component';

@Component({
  selector: 'app-bank-partial',
  templateUrl: '../../table-base/table-partial-base.component.html',
  styleUrls: ['./bank-partial.component.scss'],
  providers: [
    {
      provide: BankHttpService,
      deps: [Injector],
      useFactory: (i: Injector): BankHttpService =>
        new BankHttpService('Bank', i),
    },
    {
      provide: BankService,
      deps: [BankHttpService, Injector],
      useFactory: (bhs: BankHttpService, i: Injector): BankService =>
        new BankService(bhs, i),
    },
  ],
})
export class BankPartialComponent
  extends CatalogTablePartialBase
  implements OnInit
{
  constructor(
    protected bankService: BankService,
    protected injector: Injector
  ) {
    super(bankService, injector);

    this.createComponent = BankCreateComponent;
  }

  ngOnInit(): void {}
}
