import { ChangeDetectionStrategy, Component, Injector, OnInit } from '@angular/core';
import { TablePartialBase } from '../../table-base/table-partial-base.component';
import { BankHttpService } from './bank-http.service';
import { BankService } from './bank.service';

@Component({
  selector: 'app-bank-partial',
  templateUrl: '../../table-base/table-partial-base.component.html',
  styleUrls: ['./bank-partial.component.scss'],
  providers: [
    {
      provide: BankHttpService,
      deps: [Injector],
      useFactory: (i: Injector): BankHttpService => new BankHttpService('Bank', i),
    },
    {
      provide: BankService,
      deps: [BankHttpService, Injector],
      useFactory: (bhs: BankHttpService, i: Injector): BankService =>
        new BankService(bhs, i),
    },
  ]
})
export class BankPartialComponent extends TablePartialBase implements OnInit {
  // export class BankPartialComponent implements OnInit {
  constructor(protected bankService: BankService) {
    // constructor(protected injector: Injector) {
    // console.log(injector);
    super(bankService);
  }

  ngOnInit(): void {}
}
