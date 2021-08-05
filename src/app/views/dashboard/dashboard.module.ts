import { LangCheckModule } from './../../features/ui-components/lang-check/lang-check.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TabRouteLinkModule } from '../../features/ui-components/tab-route-link/tab-route-link.module';
import { NavigateTabListModule } from '../../features/ui-components/navigate-tab-list/navigate-tab-list.module';
import { DashboardTestComponent } from './dashboard-test/dashboard-test.component';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [DashboardComponent, DashboardTestComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    TabRouteLinkModule,
    NavigateTabListModule,
    LangCheckModule,
    TabViewModule
  ],
})
export class DashboardModule {}
