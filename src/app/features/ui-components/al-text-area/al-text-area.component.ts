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
    selector: 'al-text-area',
    templateUrl: './al-text-area.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => AlTextAreaComponent),
        },
    ],
})
export class AlTextAreaComponent extends BaseUiFormDirective
    implements OnInit, ControlValueAccessor {
    @Input() public  maxWidth = false;
    @Input() public col = 50;
    @Input() public rows = 3;
    @Input() public labelTextPosition: 'left' | 'right' | 'none' = 'left';
    @Input() public labelPosition: 'top' | 'left' | 'none' = 'top';
    @Input() public autoResize: boolean;
    @Output() public onInput: EventEmitter<any> = new EventEmitter<any>();

    public constructor(injector: Injector) {
        super(injector);
        this.value = null;
    }

    public ngOnInit(): void {
        this.onInit();
    }

    public updateValue(insideValue, markAsTouched: boolean = true): void {
        if (markAsTouched) {
            this.markAsTouched();
        }
        if (!this.disabled) {
            this.onInput.emit(insideValue);
            this.value = insideValue;
            this.onChange(this.value);
        }
    }

}
