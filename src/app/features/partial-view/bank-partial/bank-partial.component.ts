import { Component, OnInit } from '@angular/core';
import { BankService } from './bank.service';
import { TablePartialBase } from '../../table-base/table-partial-base.component';
import { BankHttpService } from './bank-http.service';

@Component({
  selector: 'app-bank-partial',
  templateUrl: '../../table-base/table-partial-base.component.html',
  styleUrls: ['./bank-partial.component.scss'],
  providers: [
    BankHttpService,
    {
      provide: BankService,
      deps: [BankHttpService],
    },
  ],
})
export class BankPartialComponent extends TablePartialBase implements OnInit {
  constructor(protected bankService: BankService) {
    super(bankService);
  }

  ngOnInit(): void {}
}
