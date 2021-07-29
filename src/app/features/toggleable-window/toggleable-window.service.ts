import {
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  ReflectiveInjector,
  Type,
  ViewContainerRef,
} from '@angular/core';
import { EToggleableWindowType } from './e-toggleable-window-type';
import { ModalContainer } from './modal-container/modal-container';
import { SidebarContainer } from './sidebar-container/sidebar-container';
import { ModalContainerComponent } from './modal-container/modal-container.component';
import { SidebarContainerComponent } from './sidebar-container/sidebar-container.component';
import { ModalContext } from './modal-container/modal-context';
import { SidebarContext } from './sidebar-container/sidebar-context';
import { ToggleableWindowContainer } from './toggleable-window-container';
import { AlertComponent } from './window-containers/alert/alert.component';
import { ConfirmComponent } from './window-containers/confirm/confirm.component';

@Injectable()
export class ToggleableWindowService {
  private viewContainerRef: ViewContainerRef;

  ASSOC_CONTEXTS: Map<EToggleableWindowType, Type<any>> = new Map<
    EToggleableWindowType,
    Type<any>
  >([
    [EToggleableWindowType.MODAL, ModalContext],
    [EToggleableWindowType.SIDEBAR, SidebarContext],
  ]);

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {}

  registerViewContainer(vcf: ViewContainerRef): void {
    if (this.viewContainerRef) {
      this.viewContainerRef.clear();
    }
    this.viewContainerRef = vcf;
  }

  alert(
    data?: any,
    type: Type<any> = AlertComponent,
    mode: EToggleableWindowType = EToggleableWindowType.MODAL
  ): Promise<any> {
    switch (mode) {
      case EToggleableWindowType.MODAL:
        return this.openModal(type, data);
        break;
      case EToggleableWindowType.SIDEBAR:
        return this.openSidebar(type, data);
        break;
    }
  }

  confirm(
    data?: any,
    type: Type<any> = ConfirmComponent,
    mode: EToggleableWindowType = EToggleableWindowType.MODAL
  ): Promise<any> {
    switch (mode) {
      case EToggleableWindowType.MODAL:
        return this.openModal(type, data);
        break;
      case EToggleableWindowType.SIDEBAR:
        return this.openSidebar(type, data);
        break;
    }
  }

  openModal<T>(
    type: Type<any>,
    data?: any,
    options: { hideOnBackdropClick?: boolean; containerType: Type<any> } = {
      containerType: ModalContainerComponent,
    }
  ): Promise<T> {
    return this.open<T, ModalContainer>(
      type,
      data,
      options,
      EToggleableWindowType.MODAL
    );
  }

  openSidebar<T>(
    type: Type<any>,
    data?: any,
    options: { hideOnBackdropClick?: boolean; containerType: Type<any> } = {
      containerType: SidebarContainerComponent,
    }
  ): Promise<T> {
    return this.open<T, SidebarContainer>(
      type,
      data,
      options,
      EToggleableWindowType.SIDEBAR
    );
  }

  private open<T, K extends ToggleableWindowContainer>(
    type: Type<any>,
    data?: any,
    options: { hideOnBackdropClick?: boolean; containerType: Type<any> } = {
      containerType: ModalContainerComponent,
    },
    mode: EToggleableWindowType = EToggleableWindowType.MODAL
  ): Promise<T> {
    if (!this.viewContainerRef) {
      return Promise.reject('No view container');
    }
    const container = this.container(options.containerType) as ComponentRef<K>;
    const injector = ReflectiveInjector.resolveAndCreate(
      [this.ASSOC_CONTEXTS.get(mode)],
      container.instance.container.injector
    );
    const context = injector.get(this.ASSOC_CONTEXTS.get(mode));
    context.data = data;
    if (!options || options.hideOnBackdropClick) {
      container.instance.context = context;
    }
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(type);
    const componentRef = container.instance.container.createComponent(
      componentFactory,
      0,
      injector
    );
    return context.promise(container, this.viewContainerRef);
  }

  container(containerType: Type<any>): ComponentRef<any> {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(containerType);
    return this.viewContainerRef.createComponent(
      componentFactory,
      this.viewContainerRef.length
    );
  }
}
