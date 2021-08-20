import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentFactoryResolver,
  inject,
  Inject,
  InjectFlags,
  OnInit,
  Self,
  SkipSelf,
  ViewChild,
  ViewContainerRef,
  ɵsetCurrentInjector as setCurrentInjector,
} from '@angular/core';
import { ButtonComponent } from './components/button/button.component';
import { ToolbarService, TOOLBAR_SERVICE_IT } from './toolbar.service';
import { Type, Optional, Injector } from '@angular/core';

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
    private cdr: ChangeDetectorRef,
    @SkipSelf() private parentInjector: Injector,
    @Self() private injector: Injector
  ) {
    console.log('ToolbarComponent toolbarService', this.toolbarService)
    console.log('parent ToolbarComponent injector', this.parentInjector)
    setInterval(() => {
      const former = setCurrentInjector(this.injector);

      this.toolbarService = inject(TOOLBAR_SERVICE_IT, InjectFlags.Optional)

      // setCurrentInjector(former);

      console.log(this.toolbarService);
    },1000)
  }

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
