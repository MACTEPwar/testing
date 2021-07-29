import { ViewContainerRef } from '@angular/core';
import { SidebarContext } from './sidebar-context';
export interface SidebarContainer {
  context: SidebarContext<any>;
  container: ViewContainerRef;
}
