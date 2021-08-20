// import { ToolbarService } from './../../ui-components/toolbar/toolbar.service';
import {
  Component, Injector,
  OnInit
} from '@angular/core';
import {
  MODEL_NAME, TABLE_HTTP_SERVICE_TYPE, TABLE_SERVICE_TYPE
} from '../../table-base/a-table-partial-base.directive';
import { ACatalogTablePartialBase } from '../../table-base/catalog/a-catalog-table-partial-base.directive';
import { BankCreateComponent } from './bank-create/bank-create.component';
import { BankHttpService } from './bank-http.service';
import { BankService } from './bank.service';

@Component({
  selector: 'app-bank-partial',
  templateUrl: '../../table-base/table-partial-base.component.html',
  styleUrls: ['./bank-partial.component.scss'],
  providers: [
    { provide: MODEL_NAME, useValue: 'Bank' },
    { provide: TABLE_HTTP_SERVICE_TYPE, useValue: BankHttpService },
    { provide: TABLE_SERVICE_TYPE, useValue: BankService },
  ],
})
export class BankPartialComponent
  extends ACatalogTablePartialBase
  implements OnInit
{
  constructor(protected injector: Injector) {
    super(injector);

    this.createComponent = BankCreateComponent;
  }

  ngOnInit(): void {}
}
