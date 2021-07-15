import { Injector } from '@angular/core';
import { TableHttpService } from '../../table-base/table-http.service';

export class BankHttpService extends TableHttpService {
  constructor(protected modelName: string, protected injector: Injector) {
    super(modelName, injector);
  }
}
