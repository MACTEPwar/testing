import { Injectable, Injector } from '@angular/core';
import { TableService } from '../../table-base/table.service';
import { BankHttpService } from './bank-http.service';

@Injectable()
export class BankService extends TableService {
  constructor(
    protected bankHttpService: BankHttpService,
    protected injector: Injector
  ) {
    super('Bank', bankHttpService, injector);
  }
}
