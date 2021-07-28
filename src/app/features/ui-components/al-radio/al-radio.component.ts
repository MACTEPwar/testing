import {
  AfterContentInit,
  ChangeDetectorRef,
  Component,
  ContentChildren,
  ElementRef,
  EventEmitter,
  forwardRef,
  Injector,
  Input,
  OnInit,
  Optional,
  Output,
  QueryList,
  TemplateRef,
} from '@angular/core';
import {
  ControlContainer,
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

import { AlTemplateDirective } from '../../../shared/directives/al-tempalte/al-template.directive';
import { BaseUiFormDirective } from '../base-classes/a-base-component';

export const RADIO_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => AlRadioComponent),
  multi: true,
};

@Component({
  selector: 'al-radio',
  templateUrl: './al-radio.component.html',
  styleUrls: ['./al-radio.component.scss'],
  providers: RADIO_VALUE_ACCESSOR,
})
export class AlRadioComponent
  extends BaseUiFormDirective
  implements OnInit, AfterContentInit, ControlValueAccessor
{
  public get options(): any[] {
    return this._options;
  }
  @Input() public set options(value: any[]) {
    if (this.optionsFrom === 'constants') {
      const finder =
        value
          ?.find((f) => f.name === this.formControlName)
          ?.constant?.map((m) => ({
            label: m.label,
            value: m.value,
          })) ?? [];
      this._options = [...finder];
    }
    if (this.optionsFrom === 'options') {
      this._options = value;
    }
  }

  // get form(): FormGroup {
  //     return this.controlContainer.control as FormGroup;
  // }

  // get control(): FormControl {
  //     return this.form.get(this._formControlName) as FormControl;
  // }

  constructor(
    // public el: ElementRef,
    // public cdr: ChangeDetectorRef,
    // @Optional() public controlContainer: ControlContainer,
    injector: Injector
  ) {
    super(injector);
    // this._formControlName = this.el?.nativeElement?.attributes?.formcontrolname?.value;
  }
  @Input() title: string;
  @Input() labelPosition: 'top' | 'left' | 'none' = 'top';
  @Input() labelTextPosition: 'left' | 'right' = 'left';
  @Input() maxWidth = false;
  @Input() selectedIndex: number;
  @Input() labelOption = 'label';
  @Input() valueOption = 'value';
  @Input() type: 'check' | 'radio' = 'radio';
  @Input() optionsFrom: 'options' | 'constants' = 'options';
  @Input() orientation: 'horizontal' | 'vertical' = 'vertical';
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @ContentChildren(AlTemplateDirective) templates: QueryList<any>;

  public itemTemplate: TemplateRef<any>;
  // tslint:disable-next-line:variable-name
  // private _formControlName: string;
  // tslint:disable-next-line:variable-name
  private _options: any[] = [];
  // tslint:disable-next-line:ban-types
  // onModelChange: Function = () => {};
  // tslint:disable-next-line:ban-types
  // onModelTouched: Function = () => {};

  ngOnInit(): void {
    this.onInit();
    if (this.selectedIndex !== undefined) {
      this.updateValue(this.options[this.selectedIndex].value);
      // if (this.controlContainer) {
      //     this.control.setValue(this.options[this.selectedIndex].value);
      // }
    }
  }

  ngAfterContentInit(): void {
    this.templates.forEach((item) => {
      switch (item.getType()) {
        case 'item':
          this.itemTemplate = item.template;
          break;

        default:
          this.itemTemplate = item.template;
          break;
      }
    });
  }

  // writeValue(value: any): void {
  //     this.value = value;
  //     this.changeDetectorRef.markForCheck();
  // }

  // registerOnChange(fn: any): void {
  //     this.onModelChange = fn;
  // }

  // registerOnTouched(fn: any): void {
  //     this.onModelTouched = fn;
  // }

  // setDisabledState?(isDisabled: boolean): void {
  //     this.disabled = isDisabled;
  //     this.cdr.markForCheck();
  // }

  updateValue(option): void {
    this.value = option;
    this.onChange(this.value);
    this.onSelect.emit(this.value);
    this.changeDetectorRef.detectChanges();
  }
}

@Component({
  selector: 'al-radio-item',
  templateUrl: './al-radio-item.component.html',
  styleUrls: ['./al-radio.component.scss'],
})
export class AlRadioItemComponent {
  @Input() id: string;
  @Input() option: any;
  // ЗАЧЕМ ЭТО СВОЙСТВО?
  @Input() selected: boolean;
  @Input() label: string;
  @Input() labelOption = 'label';
  @Input() valueOption = 'value';
  @Input() type: 'check' | 'radio' = 'radio';
  @Input() disabled = false;
  @Input() visible = true;
  @Input() template: TemplateRef<any>;
  @Input() checked: boolean;
  @Output() onSelect: EventEmitter<any> = new EventEmitter();

  onOptionClick(event: Event) {
    this.onSelect.emit(this.option[this.valueOption]);
  }
}
