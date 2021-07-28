import {
    Component,
    forwardRef,
    Injector,
    Input,
    OnInit,
    Output,
    EventEmitter,
} from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { BaseUiFormDirective } from '../base-classes/a-base-component';

@Component({
    selector: 'al-dropdown',
    templateUrl: './al-dropdown.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AlDropdownComponent),
            multi: true,
        },
    ],
})
export class AlDropdownComponent extends BaseUiFormDirective implements OnInit {
    @Input() appendTo: any = null;
    @Input() labelPosition: 'top' | 'left' | 'none' = 'top';
    @Input() labelTextPosition: 'left' | 'right' = 'left';
    @Input() maxWidth = false;
    @Input() labelOption = 'label';
    @Input() valueOption = 'value';

    @Output() onSelected: EventEmitter<any> = new EventEmitter<any>();

    val: any;

    @Input() optionsFrom: 'options' | 'constants' = 'options';

    constants = [];

    private _options: any[] = [];

    public get options(): any[] {
        return this._options;
    }

    @Input() public set options(value: any[]) {
        if (this.optionsFrom === 'constants') {
            this.constants = value;
            // const finder =
            //     value
            //         ?.find((f) => f.name === this.formControlName)
            //         ?.constant?.map((m) => ({
            //             label: m.label,
            //             value: m.value,
            //         })) ?? [];
            // this._options = [...finder];
        }
        if (this.optionsFrom === 'options') {
            this._options = value;
        }
        // this.updateValue(this.value ?? value[0]?.value);
        this.updateValue(this.value);
    }

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit(): void {
        this.onInit();
        if (this.optionsFrom === 'constants') {
            const finder =
                this.constants
                    ?.find((f) => f.name === this.formControlName)
                    ?.constant?.map((m) => ({
                        label: m.label,
                        // value: m.value,
                        value: this.strToConstantCase(m.key),
                    })) ?? [];
            this._options = [...finder];
        }
        // alert(this.labelOption)
    }

    // записывает новаое значение
    public writeValue(outsideValue: any): void {
        this.updateValue(outsideValue, false);
    }

    changeValue(insideValue): void {
        this.updateValue(insideValue.value.value);
    }

    public updateValue(insideValue, markAsTouched: boolean = true): void {
        if (markAsTouched) {
            this.markAsTouched();
        }
        if (!this.disabled) {
            if (insideValue !== undefined) {
                this.value = insideValue;
                this.val = this.options.find(
                    (f) =>
                        f[this.valueOption] ===
                        insideValue
                );
                this.onChange(insideValue);
                this.onSelected.emit(this.val);
            }
            this.changeDetectorRef.detectChanges();
        }
    }

    // public updateValue(insideValue, markAsTouched: boolean = true): void {
    //     if (markAsTouched) {
    //         this.markAsTouched();
    //     }
    //     if (!this.disabled) {
    //         if (insideValue?.value) {
    //             this.value = insideValue.value[this.valueOption];
    //             this.val = this.options.find(
    //                 (f) =>
    //                     f[this.valueOption] ===
    //                     insideValue.value[this.valueOption]
    //             );
    //             this.onChange(insideValue.value[this.valueOption]);
    //             this.onSelected.emit(this.val);
    //         }
    //         this.changeDetectorRef.detectChanges();
    //     }
    // }

    private strToConstantCase(str: string): string {
        if (!str) {
            return str;
        }
        return str
            .split('')
            .reduce(
                (acc, curr) => {
                    if (curr === curr.toUpperCase()) {
                        acc.arr.push('');
                        acc.ind++;
                    }
                    acc.arr[acc.ind] =
                        (acc.arr[acc.ind] ? acc.arr[acc.ind] : '') + curr;
                    return acc;
                },
                { arr: [], ind: -1 }
            )
            .arr.map((m) => m.toUpperCase())
            .join('_');
    }
}
