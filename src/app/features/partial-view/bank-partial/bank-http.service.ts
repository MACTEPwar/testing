import { Injector } from '@angular/core';
import { CatalogHttpService } from '../../table-base/catalog/a-catalog-http.service';

export class BankHttpService extends CatalogHttpService {
  constructor(public modelName: string, protected injector: Injector) {
    super(modelName, injector);
  }
}
