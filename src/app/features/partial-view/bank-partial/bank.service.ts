import { Injectable } from '@angular/core';
import { TableService } from '../../table-base/table.service';
import { BankHttpService } from './bank-http.service';

@Injectable()
export class BankService extends TableService {
  constructor(protected bankHttpService: BankHttpService) {
    super('bank', bankHttpService);
  }

  getHeaders(): void {
      this.headers.next([
        { property: 'id', title: 'ID' },
        { property: 'code', title: 'Код' },
        { property: 'name', title: 'Название' },
        { property: 'isDeleted', title: 'Удален' },
      ]);
  }
}
