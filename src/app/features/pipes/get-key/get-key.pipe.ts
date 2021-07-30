import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'getKey',
})
export class GetKeyPipe implements PipeTransform {
    transform(headers: any): string {
        return headers.find(f => f.isFilterKey)?.property;
    }
}
