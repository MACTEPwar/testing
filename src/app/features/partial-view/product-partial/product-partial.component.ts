import {
  MODEL_NAME,
  TABLE_HTTP_SERVICE_TYPE,
  TABLE_SERVICE_TYPE,
} from './../../table-base/a-table-partial-base.directive';
import { ToolbarService } from './../../ui-components/toolbar/toolbar.service';
import {
  Component,
  OnInit,
  Injector,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ProductHttpService } from './product-http.service';
import { ProductService } from './product.service';
import { ACatalogTablePartialBase } from '../../table-base/catalog/a-catalog-table-partial-base.directive';

@Component({
  selector: 'app-product-partial',
  templateUrl: '../../table-base/table-partial-base.component.html',
  styleUrls: ['./product-partial.component.scss'],
  providers: [
    { provide: MODEL_NAME, useValue: 'Product' },
    { provide: TABLE_HTTP_SERVICE_TYPE, useValue: ProductHttpService },
    { provide: TABLE_SERVICE_TYPE, useValue: ProductService },
    ToolbarService
  ],
})
export class ProductPartialComponent
  extends ACatalogTablePartialBase
  implements OnInit
{
  constructor(protected injector: Injector) {
    super(injector);

    // this.createComponent = ProductCreateComponent;
  }

  ngOnInit(): void {
    super.ngOnInit();
  }
}
