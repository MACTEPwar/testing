import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogsRoutingModule } from './catalogs-routing.module';
import { CatalogComponent } from './catalog/catalog.component';
import { TabRouteLinkModule } from 'src/app/features/ui-components/tab-route-link/tab-route-link.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@NgModule({
  declarations: [CatalogComponent],
  imports: [
    CommonModule,
    CatalogsRoutingModule,
    TabRouteLinkModule,
    BreadcrumbModule,
  ],
})
export class CatalogsModule {}
