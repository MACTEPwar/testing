import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [
  // {path: '', component: DashboardComponent, children: [
  //     {path: 'catalogs', loadChildren: () => import('./catalogs/catalogs.module').then((m) => m.CatalogsModule)}
  // ]},
  { path: '', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
