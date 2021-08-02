import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getSpecialField',
})
export class GetSpecialFieldPipe implements PipeTransform {
  transform(col: any, specialFields: Array<any>): any {
    return specialFields.find((f) => f.property === col.property) ?? null;
  }
}
