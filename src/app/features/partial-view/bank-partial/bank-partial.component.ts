// import { ToolbarService } from './../../ui-components/toolbar/toolbar.service';
import {
  Component,
  InjectionToken,
  Injector,
  OnInit,
  Type,
} from '@angular/core';
import { ACatalogTablePartialBase } from '../../table-base/catalog/a-catalog-table-partial-base.directive';
import { BankHttpService } from './bank-http.service';
import { BankService } from './bank.service';
import { BankCreateComponent } from './bank-create/bank-create.component';
import { TableHttpService, TableHttpServiceCreator } from '../../table-base/a-table-http.service';
import { HTTP_SERVICE, MODEL_NAME } from '../../table-base/a-table-partial-base.directive';

@Component({
  selector: 'app-bank-partial',
  templateUrl: '../../table-base/table-partial-base.component.html',
  styleUrls: ['./bank-partial.component.scss'],
  providers: [
    // new TableHttpServiceCreator<BankHttpService>(
    //   BankHttpService,
    //   'Bank',
    //   Injector
    // ).getNewTableHttpServiceInjector(),
    {
      provide: BankService,
      deps: [BankHttpService, Injector],
      useFactory: (bhs: BankHttpService, i: Injector): BankService => {
        console.log('bhs', bhs)
        return new BankService(bhs, i);
      }
    },
    {provide: MODEL_NAME, useValue: 'Bank'},
    {provide: HTTP_SERVICE, useValue: BankHttpService},
  ],
})
export class BankPartialComponent
  extends ACatalogTablePartialBase
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
