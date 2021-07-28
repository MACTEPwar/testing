import { Directive, Input } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
    selector: '[alDisabled]',
})
export class FormDisabledDirective {
    @Input()
    set alDisabled(condition: boolean) {
        const action = condition ? 'disable' : 'enable';
        setTimeout(() => this.ngControl.control[action]());
    }

    constructor(private ngControl: NgControl) {}
}
