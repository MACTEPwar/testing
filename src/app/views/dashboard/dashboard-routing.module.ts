import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardTestComponent } from './dashboard-test/dashboard-test.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
    // {path: '', component: DashboardComponent, children: [
    //     {path: 'catalogs', loadChildren: () => import('./catalogs/catalogs.module').then((m) => m.CatalogsModule)}
    // ]},
    {path: '', component: DashboardTestComponent}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }
