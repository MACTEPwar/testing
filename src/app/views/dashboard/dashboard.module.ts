import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BankPartialModule } from './../../features/partial-view/bank-partial/bank-partial.module';
import { CatalogsModule } from './catalogs/catalogs.module';
import { LangCheckModule } from './../../features/ui-components/lang-check/lang-check.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TabRouteLinkModule } from '../../features/ui-components/tab-route-link/tab-route-link.module';
import { NavigateTabListModule } from '../../features/ui-components/navigate-tab-list/navigate-tab-list.module';
import { DashboardComponent } from './dashboard.component';
import { TabViewModule } from 'primeng/tabview';
import { CreateComponentDirective } from './create-component.directive';
import { GetTabTitlePipe } from './get-tab-title.pipe';

@NgModule({
  declarations: [DashboardComponent, CreateComponentDirective, GetTabTitlePipe],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TabRouteLinkModule,
    NavigateTabListModule,
    LangCheckModule,
    TabViewModule,
    BankPartialModule,
    BreadcrumbModule
  ],
})
export class DashboardModule {}
