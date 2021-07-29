import { SidebarContext } from './sidebar-context';
import { ViewContainerRef } from '@angular/core';
export interface SidebarContainer {
  context: SidebarContext<any>;
  container: ViewContainerRef;
}