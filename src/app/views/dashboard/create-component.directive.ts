import {
  ComponentFactoryResolver,
  Directive,
  Input,
  ViewContainerRef,
  Type,
} from '@angular/core';

@Directive({
  selector: '[appCreateComponent]',
})
export class CreateComponentDirective {
  @Input() component: Type<any>;
  // @Input() cfr: ComponentFactoryResolver;

  constructor(
    private vcr: ViewContainerRef,
    private cfr: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {
    const componentFactory = this.cfr.resolveComponentFactory(this.component);
    const componentRef = this.vcr.createComponent(componentFactory);
  }
}
