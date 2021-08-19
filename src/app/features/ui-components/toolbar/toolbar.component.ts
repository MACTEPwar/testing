import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ButtonComponent } from './components/button/button.component';
import { ToolbarService } from './toolbar.service';
import { Type } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  // providers: [ToolbarService],
})
export class ToolbarComponent implements OnInit, AfterViewInit {
  @ViewChild('toolbarContainer', { read: ViewContainerRef })
  toolbarContainer: ViewContainerRef;

  constructor(
    private toolbarService: ToolbarService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef
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
