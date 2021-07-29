import { Directive, ViewContainerRef } from '@angular/core';
import { SidebarService } from './sidebar.service';

@Directive({
  selector: '[modalHolder]'
})
export class SidebarHolderDirective {

  constructor(viewContainerRef: ViewContainerRef, sidebarService: SidebarService) {
    sidebarService.registerViewContainer(viewContainerRef);
  }

}