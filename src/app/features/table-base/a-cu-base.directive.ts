import {
  Directive,
  Injector,
  OnDestroy,
  OnInit,
  Type,
  ɵsetCurrentInjector as setCurrentInjector,
} from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

import { NotificationService } from '../../core/notification/notification.service';
import { FormGenerator } from '../form-generator/form-generator.service';
import { ModalContext } from '../modal/modal-context';
import { SidebarService } from '../sidebar/sidebar.service';
import { TableService } from './table.service';
import { UnsubscriberService } from '../../core/unsubscriber/unsubscriber.service';

@Directive()
export abstract class CUBaseDirective implements OnInit, OnDestroy {
  public profileForm: FormGroup;
  public headers: any[];
  public service: TableService;

  public modalContext: ModalContext<any> = null;
  public formGenerator: FormGenerator = null;
  public notificationService: NotificationService = null;
  public us: UnsubscriberService = null;
  public sidebarService: SidebarService = null;

  public thisYear;

  constructor(
    protected injector: Injector,
    protected server: string = 'default'
  ) {
    this.setServicesFormInjector(injector);

    this.service = this.modalContext?.data?.service;
    this.profileForm = this.formGenerator.generateForm(this.service.modelName, server);
    this.thisYear = new Date().getFullYear();
  }

  public ngOnInit(): void {
    this.headers = this.service.headers.getValue();
    this.us.add(
      this.service.headers.subscribe(
        (columnTemplates) => (this.headers = columnTemplates)
      )
    );

    Object.entries(this.profileForm.controls).forEach(([name, control]) => {
      if (control instanceof FormArray) {
        control.controls.forEach(
          (f) => (f.get('name').validator = control.validator)
        );
      }
    });
  }

  public ngOnDestroy(): void {
    this.us.unsubscribeAll();
  }

  public openLinkedTable(
    component: Type<any>,
    successHandler: (success: any) => void = () => {},
    errorHandler: (error: any) => void = () => {},
    options: any = {}
  ): void {
    this.sidebarService
      .open(component, {
        tableOptions: Object.assign(
          {
            isPulledUp: true,
            selectionMode: 'multiple',
          },
          options
        ),
      })
      .then((success) => successHandler(success))
      .catch((error) => errorHandler(error));
  }

  private setServicesFormInjector(injector: Injector): void {
    const former = setCurrentInjector(injector);

    this.modalContext = injector.get(ModalContext, null);
    this.formGenerator = injector.get(FormGenerator, null);
    this.notificationService = injector.get(NotificationService, null);
    this.us = injector.get(UnsubscriberService, null);
    this.sidebarService = injector.get(SidebarService, null);

    setCurrentInjector(former);
  }
}
