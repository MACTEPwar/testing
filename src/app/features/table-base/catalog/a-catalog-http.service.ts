import { TableHttpService } from '../a-table-http.service';
import { Injector } from '@angular/core';
export abstract class CatalogHttpService extends TableHttpService {
  constructor(public modelName: string, injector: Injector) {
    super(modelName, injector);
  }
}
