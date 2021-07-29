import { Directive, ViewContainerRef } from '@angular/core';
import { ToggleableWindowService } from './toggleable-window.service';

@Directive({
  selector: '[toggleableWindowHolder]'
})
export class ToggleableWindowHolderDirective {

  constructor(viewContainerRef: ViewContainerRef, toggleableWindowService: ToggleableWindowService) {
    toggleableWindowService.registerViewContainer(viewContainerRef);
  }

}