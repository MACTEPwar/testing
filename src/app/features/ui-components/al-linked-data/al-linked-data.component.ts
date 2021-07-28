import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    forwardRef,
    Injector,
    Input,
    OnInit,
    Optional,
    Output,
    Type,
} from '@angular/core';
import {
    ControlContainer,
    FormControl,
    FormGroup,
    NG_VALUE_ACCESSOR,
} from '@angular/forms';
// import { SidebarService } from '@features/sidebar/sidebar.service';
import { TranslateService } from '@ngx-translate/core';
import { ConfigurationService } from '../../../core/configuration/configuration.service';
import { BaseUiFormDirective } from '../base-classes/a-base-component';

@Component({
    selector: 'al-linked-data',
    templateUrl: './al-linked-data.component.html',
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AlLinkedDataComponent),
            multi: true,
        },
    ],
    // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AlLinkedDataComponent
    extends BaseUiFormDirective
    implements OnInit
{
    // private _formControlName: string;

    @Input() isOldComponent = false;

    @Input() labelPosition: 'top' | 'left' | 'none' = 'top';
    @Input() labelTextPosition: 'left' | 'right' = 'left';
    @Input() maxWidth = false;

    @Input() private component: Type<any>;
    @Input() private key: string; // определяем какое поле из объекта отображать в спане
    @Input() public entityName: string;
    @Input() private display: string = null;
    @Input() linkedOptions = {};

    private _ttt: any;
    @Input() public set ttt(value: any) {
        this._ttt = value;
        this.updateValue(value);
    }
    public get ttt(): any {
        return this._ttt;
    }
    public displayValue: string;
    @Output() tttChange: EventEmitter<any> = new EventEmitter<any>();

    @Output()
    public onSelect: EventEmitter<any> = new EventEmitter<any>();

    public constructor(
        // private sidebarService: SidebarService,
        private configurationService: ConfigurationService,
        private translateService: TranslateService,
        injector: Injector
    ) {
        super(injector);
    }

    public ngOnInit(): void {
        this.onInit();
    }

    public writeValue(outsideValue: any): void {
        // this.updateValue(outsideValue, false);
        console.log(
            `AlLinkedDataComponent writeValue ${this.entityName}  --> `,
            outsideValue
        );
    }

    public updateValue(option, markOnTouched: boolean = false): void {
        // console.log(
        //     `AlLinkedDataComponent updateValue ${this.entityName}  --> `,
        //     option
        // );
        if (!option) {
            return;
        }
        this.value = option[this.key];
        this.onChange(this.value);
        this.onSelect.emit(option);
        this.displayValue =
            option[
                this.display ??
                    this.configurationService.getValue('links')[this.entityName]
            ];

        if (Array.isArray(this.displayValue)) {
            this.displayValue = this.displayValue.find(
                (f) => f.language === this.translateService.currentLang
            )?.name;
        }

        console.log('!!this.displayValue', this.displayValue);

        this.changeDetectorRef.detectChanges();
    }

    public displayLinkedData(): void {
        let options = {};
        if (this.isOldComponent) {
            options = Object.assign(
                {
                    itemIsPulledUp: true,
                    useCache: false,
                },
                this.linkedOptions
            );
        } else {
            options = {
                tableOptions: Object.assign(
                    {
                        isPulledUp: true,
                    },
                    this.linkedOptions
                ),
            };
        }

        // this.sidebarService.open(this.component, options).then((res: any) => {
        //     this.updateValue(res);
        // });
        this.control?.markAsTouched();
    }
}
