import { ProductPartialModule } from './../../features/partial-view/product-partial/product-partial.module';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { BankPartialModule } from './../../features/partial-view/bank-partial/bank-partial.module';
import { LangCheckModule } from './../../features/ui-components/lang-check/lang-check.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TabRouteLinkModule } from '../../features/ui-components/tab-route-link/tab-route-link.module';
import { NavigateTabListModule } from '../../features/ui-components/navigate-tab-list/navigate-tab-list.module';
import { DashboardComponent } from './dashboard.component';
import { TabViewModule } from 'primeng/tabview';
import { CreateComponentDirective } from './create-component.directive';

@NgModule({
  declarations: [DashboardComponent, CreateComponentDirective],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TabRouteLinkModule,
    NavigateTabListModule,
    LangCheckModule,
    TabViewModule,
    BreadcrumbModule,
    BankPartialModule,
    ProductPartialModule
  ],
})
export class DashboardModule {}
