import { Directive, Injector, Input } from '@angular/core';

@Directive()
export abstract class TableColDirective {
    value;

    constructor(injector: Injector) {
        this.setServices(injector);
    }

    setServices(injector: Injector): void {
        this.value = injector.get('Value', null);
        // alert(this.value);
        // console.log('setServices -->  ', this.value);
    }

    protected getValue(): any {
        // console.log('getValue -->  ', this.value);
        return this.value;
    }
}
