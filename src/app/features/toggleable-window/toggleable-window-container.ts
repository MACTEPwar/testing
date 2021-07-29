import { ViewContainerRef } from '@angular/core';
import { ToggleableWindowContext } from './toggleable-window-context';
export interface ToggleableWindowContainer {
  context:  ToggleableWindowContext<any>;
  container: ViewContainerRef;
}
