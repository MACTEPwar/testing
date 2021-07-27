import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    Injector,
    Input,
    ɵsetCurrentInjector as setCurrentInjector,
} from '@angular/core';
import { ControlContainer, FormControl } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Directive()
export abstract class BaseUiFormDirective {
    @Input() public label: string;
    @Input() public id: string;
    @Input() public tooltip: string;
    // TODO: убрать INPUT. у NG_VALUE_ACCESSOR (директивы formControlName) есть поле disabled
    // Для форм юзать alDisabled="true/false"
    public disabled = false;
    @Input() public isVisible = true;
    @Input() public position: string;
    @Input() public isRequired = false;
    @Input() public classes: string[] = [];
    @Input() public style: object = {};
    @Input() public placeholder = '';
    // TODO: зачем INPUT ? Убрать и использовать ngModel. Реализация ControlValueAccessor позволяет.
    @Input() public value: any;

    // Содержит formControlName
    protected formControlName: string;
    // Содержит ElementRef компонента
    protected elementRef: ElementRef;
    // Содержит ControlContainer компонента
    protected controlContainer: ControlContainer;
    // Содержит  ChangeDetectorRef
    protected changeDetectorRef: ChangeDetectorRef;
    // Получает главную форму
    get form(): FormGroup {
        return this.controlContainer?.control as FormGroup;
    }
    // Получает текущий контрол
    get control(): FormControl {
        return this.form?.get(this.formControlName) as FormControl;
    }
    // True если компонент был "тронут"
    protected touched = false;

    constructor(injector: Injector) {
        this.getTokensFormDI(injector);
    }

    // callback-функция если значение поменяли
    protected onChange = (value) => {};
    // callback-функция если элемент тронули
    protected onTouched = () => {};

    protected onInit(): void {
        this.formControlName = this.elementRef?.nativeElement?.attributes?.formcontrolname?.textContent;
        // Если ил не указан явно забираю из названия formNameControl
        this.id =
            this.id ??
            this.elementRef?.nativeElement?.attributes?.formcontrolname
                ?.textContent;
        //  ?? console.error('Для элемента не указан formControlName');

        // Забираю isRequred из валидации контрола(главный) или из явно указанного (второстепенный). False по дефолту
        this.isRequired = this.control?.validator
            ? this.control.validator(this.control)?.hasOwnProperty('required')
            : this.isRequired;
    }

    // сохраняю callback-функцию если значение поменяли
    public registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    // сохраняю callback-функцию если элемент тронули
    public registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    // устанавлтвает свойство isDisabled
    public setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    // записывает новаое значение
    public writeValue(outsideValue: any): void {
        this.updateValue(outsideValue, false);
    }

    protected markAsTouched(): void {
        if (!this.touched) {
            this.onTouched();
            this.touched = true;
            this.changeDetectorRef.detectChanges();
        }
    }

    // забираю с инжектора нужные токены
    private getTokensFormDI(injector: Injector): void {
        const former = setCurrentInjector(injector);

        this.elementRef = injector.get(ElementRef, null);
        this.controlContainer = injector.get(ControlContainer, null);
        this.changeDetectorRef = injector.get(ChangeDetectorRef, null);

        setCurrentInjector(former);
    }

    // Метод, обновляющий значение
    public abstract updateValue(event, markAsTouched: boolean): void;
}
