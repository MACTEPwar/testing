import { Directive, Injector, Input } from '@angular/core';

@Directive()
export abstract class TableColDirective {
    value;

    constructor(injector: Injector) {
        this.setServices(injector);
    }

    setServices(injector: Injector): void {
        this.value = injector.get('Value', null);
    }

    protected getValue(): any {
        return this.value;
    }
}
