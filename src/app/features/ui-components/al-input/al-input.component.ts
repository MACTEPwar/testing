import {
    Component,
    EventEmitter,
    forwardRef,
    Injector,
    Input,
    OnInit,
    Output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseUiFormDirective } from '../base-classes/a-base-component';

@Component({
    selector: 'al-input',
    templateUrl: './al-input.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => AlInputComponent),
        },
    ],
})
export class AlInputComponent
    extends BaseUiFormDirective
    implements OnInit, ControlValueAccessor
{
    @Input() public type: string;
    @Input() public maxWidth = false;
    // TODO: реализовать верно в html
    @Input() public pattern: string;
    @Input() public min = 0;
    @Input() public max: number;
    @Input() public labelTextPosition: 'left' | 'right' | 'none' = 'left';
    @Input() public labelPosition: 'top' | 'left' | 'none' = 'top';

    @Output() public onInput: EventEmitter<any> = new EventEmitter<any>();

    public constructor(injector: Injector) {
        super(injector);
    }

    public ngOnInit(): void {
        this.onInit();
    }

    public updateValue(insideValue, markAsTouched: boolean = true): void {
        if (markAsTouched) {
            this.markAsTouched();
        }
        if (!this.disabled) {
            if (this.type === 'number') {
                this.value = +insideValue;
            } else {
                this.value = insideValue;
            }
            this.onInput.emit(insideValue);
            this.onChange(this.value);
        }
    }
}
