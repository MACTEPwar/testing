import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { ProductPartialModule } from '../../../../features/partial-view/product-partial/product-partial.module';
import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product/product.component';

@NgModule({
  declarations: [ProductComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    ProductPartialModule,
    BreadcrumbModule,
  ],
})
export class ProductModule {}
