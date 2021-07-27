import { Component, forwardRef, Injector, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseUiFormDirective } from '../base-classes/a-base-component';

@Component({
    selector: 'al-checkbox',
    templateUrl: './al-checkbox.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => AlCheckboxComponent),
        },
    ],
})
export class AlCheckboxComponent
    extends BaseUiFormDirective
    implements OnInit, ControlValueAccessor {
    @Input() labelPosition: 'top' | 'left' | 'none' = 'left';
    @Input() labelTextPosition: 'left' | 'right' = 'left';
    @Input() maxWidth = false;
    @Input() fieldIsRequired = false;

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit(): void {
        this.onInit();
    }

    updateValue(incomingValue: boolean, markAsTouched: boolean = true): void {
        if (markAsTouched) {
            this.markAsTouched();
        }
        if (!this.disabled) {
            this.value = incomingValue;
            this.onChange(this.value);
        }
        this.changeDetectorRef.detectChanges();
    }
}
