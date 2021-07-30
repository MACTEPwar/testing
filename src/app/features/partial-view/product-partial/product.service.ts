import { Injectable, Injector } from '@angular/core';
import { TableService } from '../../table-base/table.service';
import { ProductHttpService } from './product-http.service';

@Injectable()
export class ProductService extends TableService {
  constructor(
    protected productHttpService: ProductHttpService,
    protected injector: Injector
  ) {
    super(productHttpService, injector);
  }
}
