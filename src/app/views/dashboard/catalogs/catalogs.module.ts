import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogsRoutingModule } from './catalogs-routing.module';
import { CatalogComponent } from './catalog/catalog.component';
import { TabRouteLinkModule } from 'src/app/features/ui-components/tab-route-link/tab-route-link.module';


@NgModule({
  declarations: [CatalogComponent],
  imports: [
    CommonModule,
    CatalogsRoutingModule,
    TabRouteLinkModule
  ]
})
export class CatalogsModule { }
