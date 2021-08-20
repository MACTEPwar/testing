import { ToolbarService } from './../../ui-components/toolbar/toolbar.service';
import { Component, OnInit, Injector, ChangeDetectionStrategy } from '@angular/core';
import { ProductHttpService } from './product-http.service';
import { ProductService } from './product.service';
import { ACatalogTablePartialBase } from '../../table-base/catalog/a-catalog-table-partial-base.directive';

@Component({
  selector: 'app-product-partial',
  templateUrl: '../../table-base/table-partial-base.component.html',
  styleUrls: ['./product-partial.component.scss'],
  providers: [
    {
      provide: ProductHttpService,
      deps: [Injector],
      useFactory: (i: Injector): ProductHttpService =>
        new ProductHttpService('Product', i),
    },
    {
      provide: ProductService,
      deps: [ProductHttpService, Injector],
      useFactory: (phs: ProductHttpService, i: Injector): ProductService =>
        new ProductService(phs, i),
    },
    ToolbarService
  ],
})
export class ProductPartialComponent
  extends ACatalogTablePartialBase
  implements OnInit
{
  constructor(
    protected bankService: ProductService,
    protected injector: Injector
  ) {
    super(bankService, injector);

    // this.createComponent = ProductCreateComponent;
  }

  ngOnInit(): void {}
}
