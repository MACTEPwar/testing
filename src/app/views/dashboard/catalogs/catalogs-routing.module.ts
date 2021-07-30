import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CatalogComponent } from './catalog/catalog.component';

const routes: Routes = [
  {
    path: '',
    component: CatalogComponent,
    children: [
      {
        path: 'bank',
        loadChildren: () =>
          import('./bank/bank.module').then((m) => m.BankModule),
      },
      {
        path: 'product',
        loadChildren: () =>
          import('./product/product.module').then((m) => m.ProductModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CatalogsRoutingModule {}
