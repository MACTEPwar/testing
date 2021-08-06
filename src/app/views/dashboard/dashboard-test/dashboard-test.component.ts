import { BankPartialComponent } from './../../../features/partial-view/bank-partial/bank-partial.component';
import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  Injector,
  OnInit,
  TemplateRef,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';

@Component({
  selector: 'app-dashboard-test',
  templateUrl: './dashboard-test.component.html',
  styleUrls: ['./dashboard-test.component.scss'],
})
export class DashboardTestComponent implements OnInit, AfterViewInit {
  tabs: Tab[] = [];

  @ViewChild('tabView', { static: true }) tabView: ViewContainerRef;
  @ViewChild('tabPanel', { static: true }) tabPanel: ViewContainerRef;

  constructor(
    public componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.addTab();
  }

  addTab(): void {
    // const injector = ReflectiveInjector.resolveAndCreate([ModalContext], container.instance.container.injector);
    // console.log(this.tabPanel)
    // const componentFactory =
    //   this.componentFactoryResolver.resolveComponentFactory(
    //     BankPartialComponent
    //   );
    // const componentRef = (this.tabPanel as any).viewContainer.createComponent(componentFactory);

    // this.tabs.push({
    //   headres: 'asd',
    //   tempalte
    // })
    this.tabs.push({ header: 'asd', component: BankPartialComponent });
  }

  open(name: string): void {}
}

export class Tab {
  header: string;
  component: Type<any>;
}
