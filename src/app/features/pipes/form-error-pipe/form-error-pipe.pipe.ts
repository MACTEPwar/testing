import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
    name: 'formErrorPipe',
})
export class FormErrorPipePipe implements PipeTransform {
    errors: any[] = [
        {
            dataType: 'inputText',
            errorType: 'required',
            errorMessage: this.translateService.instant('Errors.requiredStr'), // 'Строка обязательна к заполнению',
        },
        {
            dataType: 'inputText',
            errorType: 'minlength',
            errorMessage: this.translateService.instant('Errors.minLength'), // 'Минимальное кол-во символов больше введенного',
        },
        {
            dataType: 'inputText',
            errorType: 'maxlength',
            errorMessage: this.translateService.instant('Errors.maxLength'), // 'Превышает лимит символов',
        },

        {
            dataType: 'selectConstant',
            errorType: 'required',
            errorMessage: this.translateService.instant('Errors.requiredStr'), // 'Строка обязательна к заполнению',
        },

        {
            dataType: 'inputDaysOfWeek',
            errorType: 'required',
            errorMessage: this.translateService.instant('Errors.requiredStr'), // 'Строка обязательна к заполнению',
        },

        {
            dataType: 'linkedData',
            errorType: 'required',
            errorMessage: this.translateService.instant('Errors.requiredStr'), // 'Строка обязательна к заполнению',
        },
        // {
        //     dataType: 'System.DateTime',
        //     errorType: 'required',
        //     errorMessage: this.translateService.instant('Errors.requiredData') // 'Дата обязательна к заполнению',
        // },
        // {
        //     dataType: 'System.Int32',
        //     errorType: 'required',
        //     errorMessage: this.translateService.instant('Errors.requiredInt') // 'Строка обязательна к заполнению',
        // },
        // {
        //     dataType: 'System.Int32',
        //     errorType: 'number',
        //     errorMessage: this.translateService.instant('Errors.onlyNum') // Можливі тільки цифри
        // },
    ];

    constructor(private translateService: TranslateService) {}

    transform(controlErrors: any, controlType: string): string {
        const error = Object.entries(controlErrors)[0];
        if (error) {
            return (
                this.errors.find(
                    (f) =>
                        f.dataType === controlType && f.errorType === error[0]
                ).errorMessage ?? 'Не извесная ошибка'
            );
        } else {
            return 'Не извесная ошибка';
        }

        // Object.entries(this.errors).filter(error => error[0])
        // console.log('controlErrors  -->  ', controlErrors);
        // console.log('controlType  -->  ', controlType);
        // return 'asd';
    }
}
