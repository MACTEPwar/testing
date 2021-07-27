import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[alTemplate]',
    // tslint:disable-next-line:no-host-metadata-property
    host: {
    }
})
export class AlTemplateDirective {

    @Input() type: string;

    @Input('alTemplate') name: string;

    constructor(public template: TemplateRef<any>) { }

    getType(): string {
        return this.name;
    }

}
