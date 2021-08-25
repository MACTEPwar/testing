import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver, OnInit, Type, ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ToolbarService } from './toolbar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  providers: [],
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  @ViewChild('toolbarContainer', { read: ViewContainerRef })
  toolbarContainer: ViewContainerRef;

  constructor(
    private toolbarService: ToolbarService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.toolbarService.items.subscribe((items) => {
      this.toolbarContainer.clear();
      items.forEach((item) => {
        this.addComponents(item.component, item.options);
      });
    });
    this.cdr.detectChanges();
  }

  addComponents(component: Type<any>, options: any = {}): void {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(component);
    const componentRef =
      this.toolbarContainer.createComponent(componentFactory);
    componentRef.instance.options = options;
  }

  clear(): void {
    this.toolbarContainer.clear();
  }
}
