import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'titleByControlName',
})
export class TitleByControlNamePipe implements PipeTransform {
    transform(formControlName: string, headers: any[]): string {
        return headers.find(f => f.property === formControlName)?.title ?? '';
    }
}
