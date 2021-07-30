import {
  ComponentFactoryResolver,
  Type,
  Injectable,
  ViewContainerRef,
  ComponentRef,
  ReflectiveInjector
} from '@angular/core';

import { SidebarContext } from './sidebar-context';
import { SidebarContainer } from './sidebar-container';
import { SidebarContainerComponent } from './sidebar-container/sidebar-container.component';

@Injectable()
export class SidebarService {

  private viewContainerRef: ViewContainerRef;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
  }

  registerViewContainer(vcf: ViewContainerRef): void {
    if (this.viewContainerRef) {
      this.viewContainerRef.clear();
    }
    this.viewContainerRef = vcf;
  }

  open<T>(type: Type<any>, data?: any, incomingFilter?: any, options: { hideOnBackdropClick?: boolean, containerType: Type<any> } = {containerType: SidebarContainerComponent}): Promise<T> {
    if (!this.viewContainerRef) {
      return Promise.reject('No view container');
    }
    const container = this.container(options.containerType) as ComponentRef<SidebarContainer>;
    const injector = ReflectiveInjector.resolveAndCreate([SidebarContext], container.instance.container.injector);
    const context = injector.get(SidebarContext);
    context.data = data;
    if (!options || options.hideOnBackdropClick) {
      container.instance.context = context;
    }
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(type);
    const componentRef = container.instance.container.createComponent(componentFactory, 0, injector);
    componentRef.instance.incomingFilter = incomingFilter;

    return context.promise(container, this.viewContainerRef);
  }

  container(containerType: Type<any>): ComponentRef<any> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(containerType);
    return this.viewContainerRef.createComponent(componentFactory, this.viewContainerRef.length);
  }

}
