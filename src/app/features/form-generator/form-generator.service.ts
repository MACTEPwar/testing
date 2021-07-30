import { Injectable } from '@angular/core';
import { GqlQueryBuilderService } from '../../core/gql-query-builder/services/gql-query-builder.service';
import {
    FormArray,
    FormGroup,
    FormControl,
    AbstractControl,
    Validators,
} from '@angular/forms';
import { Model } from '../../core/models-loader/types/model';
import { Field } from '../../core/models-loader/types/field';
import { TranslateService } from '@ngx-translate/core';
@Injectable()
export class FormGenerator {
    constructor(
        private gqlQueryBuilderService: GqlQueryBuilderService,
        private translateService: TranslateService
    ) {}

    /**
     * Генерирует форму (FormGroup) по схеме модели
     * @param modelName Название модели
     */
    public generateForm(
        modelName: string,
        server: string = 'default'
    ): FormGroup {
        const MODEL = this.getModel(modelName, server);
        MODEL.fields = MODEL.fields.filter((f) => f.kind !== 'OBJECT');
        const FORM_GROUP = new FormGroup({});

        MODEL.fields.forEach((el) => {
            const TEMP = this.generateModelForField(el);
            FORM_GROUP.addControl(TEMP.name, TEMP.control);
        });

        return FORM_GROUP;
    }

    /**
     * Получает схему модели
     * @param modelName Название модели
     */
    private getModel(modelName: string, server: string = 'default'): Model {
        return this.gqlQueryBuilderService.buildModelSchema(
            modelName,
            1,
            0,
            server
        );
    }

    /**
     * Возвращает AbstractControl по схеме свойства
     * @param field Схема свойства
     */
    private generateModelForField(
        field: Field,
        defaultValue: any = null
    ): {
        name: string;
        control: AbstractControl;
    } {
        let result: FormControl | FormGroup | FormArray;
        switch (field.kind) {
            case 'OBJECT': {
                result = new FormGroup({});
                field.fields.forEach((curField) => {
                    const TEMP = this.generateModelForField(curField);
                    (result as FormGroup).addControl(TEMP.name, TEMP.control);
                });
                break;
            }
            case 'ARRAY': {
                result = new FormArray([]);
                if (field.ofModel === 'Locale') {
                    this.translateService.store.langs.forEach((lang) => {
                        const gr = new FormGroup({});
                        field?.fields?.forEach((curField) => {
                            const TEMP = this.generateModelForField(
                                curField,
                                curField.property === 'language' ? lang : null
                            );
                            gr.addControl(TEMP.name, TEMP.control);
                        });
                        (result as FormArray).push(gr);
                    });
                } else {}

                break;
            }
            // TODO: добавить логику для ENUM
            default: {
                result = new FormControl(defaultValue);
                break;
            }
        }
        if (field.isRequired) {
            result.setValidators(Validators.required);
        }
        return {
            name: field.property,
            control: result,
        };
    }
}
