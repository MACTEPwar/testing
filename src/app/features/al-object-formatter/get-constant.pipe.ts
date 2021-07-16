import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'getConstant',
})
export class GetConstantPipe implements PipeTransform {
    transform(value: string, constants: Array<any>, type: string): string {
        const constArray = constants.find((f) => f.name === type)?.constant;
        return constArray.find(f => f.key === this.constantCase2camelCase(value))?.label;
    }

    constantCase2camelCase(valueConstantCase: string): string {
        return valueConstantCase
            .split('_')
            .map((m) => m.toLowerCase())
            .map((m) => m[0].toUpperCase() + m.slice(1))
            .join('');
    }
}
