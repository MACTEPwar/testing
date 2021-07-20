import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'enumerator',
})

export class EnumeratorPipe implements PipeTransform {

    transform(value: number): any[] {
        return new Array(value);
    }
}
